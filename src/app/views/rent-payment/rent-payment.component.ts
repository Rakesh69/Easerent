import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToasterService } from 'angular2-toaster';
import Stepper from 'bs-stepper';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Globals } from '../../globals';
import { isAlphabet, isNumber } from '../../shared/ngbd-modal-content/validators/custom.validator';

@Component({
  selector: 'app-rent-payment',
  templateUrl: './rent-payment.component.html',
  styleUrls: ['./rent-payment.component.scss']
})
export class RentPaymentComponent implements OnInit {

  isFormSubmitted: boolean = false;
  isStartRenting: boolean = false;
  newAccountInfoForm: FormGroup;
  accountInfoForm: FormGroup;
  rentalAgreementForm: FormGroup;
  addYourTenantForm: FormGroup;
  monthlyRentInfoForm: FormGroup;
  securityDepositForm: FormGroup;
  shareDocumentsForm: FormGroup;

  accountInfos: any = [];
  private stepper: Stepper;

  @ViewChild('addNewAccountInfo', {static: false}) public addNewAccountInfo: ModalDirective;

  constructor(
    public formBuilder: FormBuilder,
    public toasterService: ToasterService,
    public sanitizer: DomSanitizer
  ) {
    this.accountInfos = [{
      "accountHolderName": "Test User",
      "accountNumber": "565656565656",
      "ifscCode": "ICIC0002323"
    }]
  }

  ngOnInit() {
    this.createForm();
  }

  initStepper(): void {
    this.isStartRenting = true;

    setTimeout(() => {
      this.stepper = new Stepper(document.querySelector('#stepper1'), {
        linear: true,
        animation: true,
        selectors: {
          steps: '.step',
          trigger: '.step-trigger',
          stepper: '.bs-stepper'
        }
      });

      // this.stepper.to(6);
    }, 100);
  }

  createForm(): void {
    this.accountInfoForm = this.formBuilder.group({
      account: new FormControl('', [Validators.required])
    });

    this.rentalAgreementForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      isNoEndDate: new FormControl(''),
    });

    this.addYourTenantForm = this.formBuilder.group({
      tenants: new FormArray([
        this.createFormAddYourTenantForm()
      ])
    }); 

    this.monthlyRentInfoForm =  this.formBuilder.group({
      monthlyDueDate: new FormControl(''),
      monthlyRentAmount: new FormControl(''),
      rentColletionStartOn: new FormControl(''),
      isCollectProratedRent: new FormControl(true),
      prorateRentDueDate: new FormControl(''),
      prorateRentAmount: new FormControl(''),
      isAutomaticLateFees: new FormControl(true),
      addFee: new FormControl(''),
      lateFeeAmount: new FormControl(''),
    });

    this.securityDepositForm = this.formBuilder.group({
      isCollectSecurityDeposit: new FormControl(true),
      securityDepositDueDate: new FormControl(''),
      securityDepositAmount: new FormControl(''),
      isAdditionalMoveInCost: new FormControl(true),
      memo: new FormControl(''),
      dueDate: new FormControl(''),
      amount: new FormControl(''),
    });

    this.shareDocumentsForm = this.formBuilder.group({
      documents: new FormControl([]),
      rentalAgreement: new FormControl('')
    });
  }

  createFormAddYourTenantForm(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
    });
  }

  addAnotherTenantForm(): void {
    const tenants = this.addYourTenantForm.get('tenants') as FormArray;
    tenants.push(this.createFormAddYourTenantForm());
  }

  addNewAccountInfoForm(): void {
    this.newAccountInfoForm = this.formBuilder.group({
      "accountHolderName": new FormControl('', [Validators.required, isAlphabet]),
      "accountNumber": new FormControl('', [Validators.required, isNumber]),
      "ifscCode": new FormControl('', [Validators.required]),
    });

    this.addNewAccountInfo.show();
  }

  newAccountInfoFormSubmit(): void {
    this.isFormSubmitted = true;
    console.log('addAttachmentForm : ', this.newAccountInfoForm.value);
    
    if(this.newAccountInfoForm.valid) {
      // this.attachments.push(this.addAttachmentForm.value);

      this.accountInfos.push(this.newAccountInfoForm.value);
      this.newAccountInfoForm.reset();
      this.isFormSubmitted = false;
      this.addNewAccountInfo.hide();

      this.toasterService.pop('success', 'Success', 'New account added successfully.');
    } else {
      this.toasterService.pop('error', 'Error', 'Please enter valid value.');
    }
  }

  deleteTenant(i: number): void {
    const tenantForms = this.addYourTenantForm.get('tenants') as FormArray;
    tenantForms.removeAt(i);
  }

  async onChangeUploadShareDocumentImages(event: any) {
    console.log('Event : ', event.target.files);

    if(event.target.files && event.target.files.length > 0) {
      let attachmentBlobUrls = [];
      for (const key in event.target.files) {
        if (Object.prototype.hasOwnProperty.call(event.target.files, key)) {
          const file = event.target.files[key];
          const blobUrl = await Globals.fileToBlobUrl(file);
          console.log('blobUrl : ', blobUrl);

          attachmentBlobUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
        }
      }   

      this.shareDocumentsForm.get('documents').setValue([...this.shareDocumentsForm.get('documents').value,...attachmentBlobUrls]);
    }
  }

  async onChangeRentalAgreementImage(event: any) {
    console.log('Event : ', event.target.files);

    if(event.target.files && event.target.files.length > 0) {
      let attachmentBlobUrls = [];
      for (const key in event.target.files) {
        if (Object.prototype.hasOwnProperty.call(event.target.files, key)) {
          const file = event.target.files[key];
          const blobUrl = await Globals.fileToBlobUrl(file);
          console.log('blobUrl : ', blobUrl);

          this.shareDocumentsForm.get('rentalAgreement').setValue(this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
        }
      }   
    }
  }


  previous() {
    this.stepper.previous();
  }

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  isNewAccountInfoFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.newAccountInfoForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }

  isAccountInfoFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.accountInfoForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.rentalAgreementForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }

  isAddYourTenantFormSubmittedAndError(formGroup: FormGroup, controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(formGroup, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }

  isMonthlyRentInfoFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.monthlyRentInfoForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }

  isSecurityDepositFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.securityDepositForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }
}
