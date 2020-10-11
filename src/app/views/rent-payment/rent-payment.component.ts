import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import Stepper from 'bs-stepper';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Lightbox } from 'ngx-lightbox';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { Globals } from '../../globals';
import { TakePhotoModalComponent } from '../../shared/ngbd-modal-content/custom-components/take-photo-modal/take-photo-modal.component';
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
  brokerAccountInfoForm: FormGroup;
  brokerFeesForm: FormGroup;
  addAttachmentForm: FormGroup;
  isCollectBrokerFees: number = 0;

  attachments: any = [];
  tempAttachments: any = [];

  accountInfos: any = [];
  private stepper: Stepper;
  stepTo: number = -1;

  @ViewChild('addNewAccountInfo', {static: false}) public addNewAccountInfo: ModalDirective;
  @ViewChild('addAttachment', {static: false}) public addAttachment: ModalDirective;
 
  constructor(
    public formBuilder: FormBuilder,
    public toasterService: ToasterService,
    public sanitizer: DomSanitizer,
    public lightbox: Lightbox,
    public route: ActivatedRoute,
    public router: Router,
    public modalService: NgbModal
  ) {
    this.accountInfos = [{
      "accountHolderName": "Test User",
      "accountNumber": "565656565656",
      "ifscCode": "ICIC0002323"
    }, {
      "accountHolderName": "Demo User",
      "accountNumber": "656655656656",
      "ifscCode": "SBI00002323"
    }]
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.stepTo = params['step'] || -1;
        if(this.stepTo > 0) {
          this.initStepper(this.stepTo);
        }
    });

    this.createForm();
  }

  initStepper(stepperTo: number = -1): void {
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

      console.log('stepperTo : ', stepperTo);
      
      if(stepperTo > 0) {
        this.stepper.to(stepperTo);
      }
    }, 100);
  }

  createForm(): void {
    const todayDate = new Date();
    const todayDateStr = (todayDate).toISOString().substring(0,10);

    this.accountInfoForm = this.formBuilder.group({
      account: new FormControl(this.accountInfos[0], [Validators.required])
    });

    this.rentalAgreementForm = this.formBuilder.group({
      startDate: new FormControl(todayDateStr),
      endDate: new FormControl(todayDateStr),
      isNoEndDate: new FormControl(''),
    });

    this.addYourTenantForm = this.formBuilder.group({
      tenants: new FormArray([
        this.createFormAddYourTenantForm()
      ])
    }); 

    this.monthlyRentInfoForm =  this.formBuilder.group({
      monthlyDueDate: new FormControl(todayDateStr),
      monthlyRentAmount: new FormControl('5000'),
      rentColletionStartOn: new FormControl(todayDateStr),
      isCollectProratedRent: new FormControl(true),
      prorateRentDueDate: new FormControl(todayDateStr),
      prorateRentAmount: new FormControl('1000'),
      isAutomaticLateFees: new FormControl(true),
      addFee: new FormControl('5 days after the rent is due'),
      lateFeeAmount: new FormControl('500'),
    });

    this.securityDepositForm = this.formBuilder.group({
      isCollectSecurityDeposit: new FormControl(true),
      securityDepositDueDate: new FormControl(todayDateStr),
      securityDepositAmount: new FormControl('5000'),
      isAdditionalMoveInCost: new FormControl(true),
      memo: new FormControl('Memo1'),
      dueDate: new FormControl(todayDateStr),
      amount: new FormControl('500'),
    });

    this.shareDocumentsForm = this.formBuilder.group({
      documents: new FormControl([]),
    });

    this.brokerAccountInfoForm = this.formBuilder.group({
      account: new FormControl(this.accountInfos[1], [Validators.required])
    });

    this.brokerFeesForm = this.formBuilder.group({
      brokerFeesDueDate: new FormControl(todayDateStr),
      brokerFees: new FormControl('600'),
    });

    this.addAttachmentForm = this.formBuilder.group({
      attachment: new FormControl('', [Validators.required]),
      documentType: new FormControl(''),
      documentName: new FormControl('')
    });
  }

  createFormAddYourTenantForm(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl('test', [Validators.required]),
      lastName: new FormControl('user', [Validators.required]),
      email: new FormControl('test@user.com', [Validators.required]),
      phoneNumber: new FormControl('4545454545', [Validators.required]),
    });
  }

  addAnotherTenantForm(): void {
    const tenants = this.addYourTenantForm.get('tenants') as FormArray;
    this.isFormSubmitted = true;

    if(tenants.valid) {
      this.isFormSubmitted = false;
      tenants.push(this.createFormAddYourTenantForm());
    } else {
      this.toasterService.pop('error', 'Error', 'Please enter valid value.');
    }
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


  addDocumentSubmit(): void {
    this.isFormSubmitted = true;
    console.log('addAttachmentForm : ', this.addAttachmentForm.value);
    
    if(this.addAttachmentForm.valid) {
      // this.attachments.push(this.addAttachmentForm.value);
      const addAttachmentFormData = this.addAttachmentForm.value;
      if(addAttachmentFormData && (addAttachmentFormData['documentType'] || addAttachmentFormData['documentName'])) {
        this.tempAttachments.push(this.addAttachmentForm.value);
        this.addAttachmentForm.reset();
        this.isFormSubmitted = false;
      } else {
        this.toasterService.pop('error', 'Error', 'Please select document type OR enter document name.');
      }
    } else {
      this.toasterService.pop('error', 'Error', 'Please select attachment.');
    }
  }

  attachmentSubmit(): void {
    this.isFormSubmitted = true;
    
    if(this.addAttachmentForm.valid || this.tempAttachments.length > 0) {
      this.isFormSubmitted = false;
      this.addAttachment.hide();
      this.attachments = [...this.attachments, ...this.tempAttachments];
      this.shareDocumentsForm.get('documents').setValue(this.attachments);
      // this.toasterService.pop('success', 'Success', 'Attachment data added successfully.');
    } else {
      this.toasterService.pop('error', 'Error', 'Please select attachment.');
    }
  }

  async onChangePhotoFromDevice(event: any) {
    console.log('Event : ', event.target.files);

    if(event.target.files && event.target.files.length > 0) {
      for (const key in event.target.files) {
        if (Object.prototype.hasOwnProperty.call(event.target.files, key)) {
          const file = event.target.files[key];
          const blobUrl = await Globals.fileToBlobUrl(file);
          console.log('blobUrl : ', blobUrl);

          this.addAttachmentForm.get('attachment').setValue(this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));   
        }
      }
    }
  }

  takePhotoModalOpen() {
    const modalRef = this.modalService.open(TakePhotoModalComponent,  { size: 'lg' })
    modalRef.result.then((result) => {
      if(result) {
        this.addAttachmentForm.get('attachment').setValue(result);
      }
    }, (reason) => {
      console.log('this.getDismissReason(reason) : ', this.getDismissReason(reason));
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  rentPaymentSubmit(): void {
    const rentPayment = {
      accountInfoForm: this.accountInfoForm.value,
      rentalAgreementForm: this.rentalAgreementForm.value,
      addYourTenantForm: this.addYourTenantForm.value,
      monthlyRentInfoForm: this.monthlyRentInfoForm.value,
      securityDepositForm: this.securityDepositForm.value,
      shareDocumentsForm: this.shareDocumentsForm.value,
      brokerAccountInfoForm: this.brokerAccountInfoForm.value,
      brokerFeesForm: this.brokerFeesForm.value,
    }

    localStorage.setItem('rentPayment', JSON.stringify(rentPayment));

    this.router.navigateByUrl('/rentPayment/summary');
  }

  deleteAttachment(i: number): void {
    this.attachments.splice(i, 1);
  }

  showLigthBox(index: number = -1): void {
    console.log('index : ', index);
    
    if(index >= 0) {
      let images = [];
      for (const key in this.attachments) {
        if (Object.prototype.hasOwnProperty.call(this.attachments, key)) {
          const attachment = this.attachments[key];
          console.log('attachment : ', attachment);
          
          const image = {
            src: attachment['attachment'],
            caption: attachment['documentType'] || attachment['documentName'],
            thumb: attachment['attachment']
          };

          images.push(image);
        }
      }

      this.lightbox.open(images, index);
    }
  }
  previous() {
    this.isFormSubmitted = false;
    if(this.stepTo > -1) {
      this.rentPaymentSubmit();
    } else {
      this.stepper.previous();
    }
  }

  next() {
    this.isFormSubmitted = false;
    if(this.stepTo > -1) {
      this.rentPaymentSubmit();
    } else {
      this.stepper.next();
    }
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

  isBrokerAccountInfoFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.brokerAccountInfoForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }

  isBrokerFeesFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.brokerFeesForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }

  isAddAttachmentFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.addAttachmentForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);                       
  }
}
