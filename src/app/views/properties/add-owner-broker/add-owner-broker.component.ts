import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-owner-broker',
  templateUrl: './add-owner-broker.component.html',
  styleUrls: ['./add-owner-broker.component.scss']
})
export class AddOwnerBrokerComponent implements OnInit {

  addProperty: FormGroup;
  isFormSubmitted: boolean = false;
  addedProperty: any = {};

  @ViewChild('successModal', {static: false}) public successModal: ModalDirective;
  
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.addProperty = this.formBuilder.group({
      propertyName: new FormControl('propertyName', [Validators.required, Validators.maxLength(100)]),
      propertyType: new FormControl('Retail', [Validators.required]),
      address: new FormControl('address', [Validators.required, Validators.maxLength(300)]),
      city: new FormControl('city', [Validators.required, Validators.maxLength(100)]),
      state: new FormControl('state', [Validators.required, Validators.maxLength(100)]),
      pincode: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    })
  }

  formSubmit(): void {
    this.isFormSubmitted = true;

    if(this.addProperty.valid) {
      this.addedProperty = this.addProperty.value;
      this.addProperty.reset();
      this.successModal.show()
      this.isFormSubmitted = false;
    }
  }

  
  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    const otherError: any = this.addProperty.controls[controlName].errors;
    
    if (this.isFormSubmitted && otherError) {
        return errorName == '' ? true : (otherError ? !Object.keys(otherError).some(err => notError.includes(err)) : true) ? this.addProperty.controls[controlName].hasError(errorName) : false;
    } 
    return false;                
  } 
}
