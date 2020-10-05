import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Globals } from './../../../globals';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import csc from 'country-state-city'

@Component({
  selector: 'app-add-owner-broker',
  templateUrl: './add-owner-broker.component.html',
  styleUrls: ['./add-owner-broker.component.scss']
})
export class AddOwnerBrokerComponent implements OnInit {

  addProperty: FormGroup;
  isFormSubmitted: boolean = false;
  addedProperty: any = {};
  states: any = [];
  cities: any = [];

  @ViewChild('successModal', {static: false}) public successModal: ModalDirective;
  
  constructor(public formBuilder: FormBuilder, public sanitizer: DomSanitizer, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.createForm();
    this.getDefaultState();
  }

  createForm(): void {
    this.addProperty = this.formBuilder.group({
      coverImage: new FormControl(''),
      propertyName: new FormControl('propertyName', [Validators.required, Validators.maxLength(100)]),
      propertyType: new FormControl('Retail', [Validators.required]),
      addressLine1: new FormControl('address 1', [Validators.required, Validators.maxLength(300)]),
      addressLine2: new FormControl('address 2', [Validators.required, Validators.maxLength(300)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      state: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    })

    this.addProperty.get('state').valueChanges.distinctUntilChanged().subscribe(selectedState => {
      this.getCitiesByStateId(selectedState);
    });
  }

  formSubmit(): void {
    this.isFormSubmitted = true;

    if(this.addProperty.valid) {
      this.spinner.show();
      this.addedProperty = this.addProperty.value;
      this.addProperty.reset();
      this.successModal.show()
      this.isFormSubmitted = false;

      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
  }

  
  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    const otherError: any = this.addProperty.controls[controlName].errors;
    
    if (this.isFormSubmitted && otherError) {
        return errorName == '' ? true : (otherError ? !Object.keys(otherError).some(err => notError.includes(err)) : true) ? this.addProperty.controls[controlName].hasError(errorName) : false;
    } 
    return false;                
  } 

  async onChangePropertyCoverImage(event: any) {
    console.log('Event : ', event.target.files);

    if(event.target.files && event.target.files.length > 0) {
      let attachmentBlobUrls = [];
      for (const key in event.target.files) {
        if (Object.prototype.hasOwnProperty.call(event.target.files, key)) {
          const file = event.target.files[key];
          const blobUrl = await Globals.fileToBlobUrl(file);
          console.log('blobUrl : ', blobUrl);

          this.addProperty.get('coverImage').setValue(this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
        }
      }   
    }
  }

  getDefaultState(countryCode: string = 'IN'): void {
    const selectedCountry = csc.getCountryByCode(countryCode);
    console.log('selectedCountry : ', selectedCountry);
    
    this.states = csc.getStatesOfCountry(selectedCountry['id']);
  }

  getCitiesByStateId(stateId: string = ''): void {
    this.cities = csc.getCitiesOfState(stateId);
  }
}
