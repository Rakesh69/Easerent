import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Globals } from './../../../globals';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import csc from 'country-state-city'
import { CommonService } from '../../../common/commonService';
import { urlConstant } from '../../../constant/urlConstant';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';

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
  loginUser: any = {};
  propertyId: any;
  @ViewChild('successModal', { static: false }) public successModal: ModalDirective;
  @ViewChild('InviteUserModal', { static: false }) public InviteUserModal: ModalDirective;
  inveteUserList: any = [];
  inviteUserDetail: any = {
    userRole: 'Owner'
  };
  isSubmitted = false;
  constructor(
    public _CommonService: CommonService,
    public toasterService: ToasterService,
    public formBuilder: FormBuilder,
    public router: Router,
    public sanitizer: DomSanitizer
  ) {
    this.createForm();
    this.loginUser = this._CommonService.getLoggedInUser();
  }

  ngOnInit() {
    this.getDefaultState();

  }

  createForm(): void {
    this.addProperty = this.formBuilder.group({
      coverImage: new FormControl(''),
      propertyName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      propertyType: new FormControl('', [Validators.required]),
      addressLine1: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      addressLine2: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      stateId: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      state: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      isClicked: new FormControl(false),
      isSubmited: new FormControl(false),
    })

    this.addProperty.get('stateId').valueChanges.distinctUntilChanged().subscribe(selectedState => {
      this.addProperty.get('state').setValue(selectedState['name']);
      this.getCitiesByStateId(selectedState['id']);
    });
  }

  get addPropertyIsClicked(): FormControl {
    return this.addProperty.get('isClicked') as FormControl;
  }

  get addPropertyIsSubmmited(): FormControl {
    return this.addProperty.get('isSubmited') as FormControl;
  }

  formSubmit(): void {
    this.addPropertyIsClicked.setValue(true);

    if (this.addProperty.invalid && this.addPropertyIsSubmmited.value === false) {
      return;
    } else {
      this.addPropertyIsSubmmited.setValue(true);
      this._CommonService.showLoading();
      const reqData = this.addProperty.value;
      reqData.userId = this.loginUser.userId;
      // console.log(reqData);
      this._CommonService.post(urlConstant.Property.Add, reqData).subscribe((res) => {
        if (!!res) {
          debugger
          this.toasterService.pop('success', 'Success', res.message);
          this.propertyId = res.data.Property.propertyId;
           this.successModal.show();
          // this.router.navigate(['/admin/properties/addPropertyDetails'], { queryParams: { propertyId: res.data.Property.propertyId }});
        } else {
          this.toasterService.pop('error', 'Error', res.message);
        }
      }, (error) => {
        if (error != null) {
          this.toasterService.pop('error', 'Error', error.message);
        }

      }).add(() => {
        this.addProperty.reset();
        this.addPropertyIsClicked.setValue(false);
        this.addPropertyIsSubmmited.setValue(false);
        this._CommonService.hideLoading();
      });
    }
  }

  async onChangePropertyCoverImage(event: any) {
    console.log('Event : ', event.target.files);

    if (event.target.files && event.target.files.length > 0) {
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

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.addProperty, this.addProperty.get('isClicked').value, controlName, errorName, notError);
  }

  addPropertyDetail() {
    this.router.navigate(['/admin/properties/addPropertyDetails'], { queryParams: { propertyId: this.propertyId } });
  }

  showModel() {
    this.successModal.show();
  }

  inviteUser() {
    this.InviteUserModal.show();
  }

  SaveInviteUserDetail(userform: NgForm) {
    if (userform.invalid) {
      this.isSubmitted = true;
      return;
    }
    this.inviteUserDetail.userId = this.loginUser.userId;
    this.inviteUserDetail.propertyId = this.propertyId;
    this.inveteUserList.push(this.inviteUserDetail);
    // console.log(this.inveteUserList);
    this.inviteUserDetail = {
      userRole: 'Owner'
    };
    this.isSubmitted = false;
  }

  deleteInviteUser(i: number): void {
    this.inveteUserList.splice(i, 1);
  }

  submitInviteUserDetail() {
    if (this.inveteUserList.length > 0) {
      this._CommonService.showLoading();
      this._CommonService.post(urlConstant.Property.AddPropertyUserInvitation, this.inveteUserList).subscribe((res) => {
        if (!!res) {
          this.toasterService.pop('success', 'Success', res.message);
          this.InviteUserModal.hide();
          // this.router.navigate(['/admin/properties/addPropertyDetails'], { queryParams: { propertyId: res.data.Property.propertyId }});
        } else {
          this.toasterService.pop('error', 'Error', res.message);
        }
        this._CommonService.hideLoading();
      }, (error) => {
        if (error != null) {
          this.toasterService.pop('error', 'Error', error.message);
        }
        this._CommonService.hideLoading();
      });
    } else {

      return;
    }
  }
}
