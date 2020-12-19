import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Globals } from './../../../globals';
import { Lightbox } from 'ngx-lightbox';
import { DomSanitizer } from '@angular/platform-browser';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TakePhotoModalComponent } from '../../../shared/ngbd-modal-content/custom-components/take-photo-modal/take-photo-modal.component';
import { CommonService } from '../../../common/commonService';
import { ActivatedRoute, Router } from '@angular/router';
import { urlConstant } from '../../../constant/urlConstant';

@Component({
  selector: 'app-add-property-details',
  templateUrl: './add-property-details.component.html',
  styleUrls: ['./add-property-details.component.scss']
})
export class AddPropertyDetailsComponent implements OnInit {

  addPropertyDetailForm: FormGroup;
  addAttachmentForm: FormGroup;
  isFormSubmitted: boolean = false;
  attachments: any = [];
  tempAttachments: any = [];
  deviceId: string;
  config = {
    keyboard: true,
    ignoreBackdropClick: false
  };
  propertId: any;
  uploadFile: any;
  loginUser: any = {};
  uploadAttachmentList: any = [];
  @ViewChild('addAttachment', { static: false }) public addAttachment: ModalDirective;

  constructor(
    public formBuilder: FormBuilder,
    public toasterService: ToasterService,
    public lightbox: Lightbox,
    public sanitizer: DomSanitizer,
    private modalService: NgbModal,
    public _CommonService: CommonService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.loginUser = this._CommonService.getLoggedInUser();
    this.route.queryParams.subscribe(params => {

      this.propertId = params['propertyId'];
      this.GetDocumentByPropertyId();

    });
  }

  ngOnInit() {
    this.createForm();

  }

  createForm(): void {
    this.addPropertyDetailForm = this.formBuilder.group({
      attachments: new FormControl([]),
      livingRoom: new FormControl(0),
      kitchen: new FormControl(0),
      bedroom: new FormControl(0),
      bathroom: new FormControl(0),
      additionalRoom: new FormControl(0),
      additionalRooms: new FormArray([]),
      furnished: new FormControl(false),
      fan: new FormControl(0),
      sofa: new FormControl(0),
      tv: new FormControl(0),
      bed: new FormControl(0),
      isClicked: new FormControl(false),
      isSubmited: new FormControl(false),
    });

    this.addAttachmentForm = this.formBuilder.group({
      attachment: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      isClicked: new FormControl(false),
      isSubmited: new FormControl(false),
    });

    this.addAditionalRoomCtrl();
  }

  get addPropertyDetailFormIsClicked(): FormControl {
    return this.addPropertyDetailForm.get('isClicked') as FormControl;
  }

  get addPropertyDetailFormIsSubmmited(): FormControl {
    return this.addPropertyDetailForm.get('isSubmited') as FormControl;
  }

  get addAttachmentFormIsClicked(): FormControl {
    return this.addAttachmentForm.get('isClicked') as FormControl;
  }

  get addAttachmentFormIsSubmmited(): FormControl {
    return this.addAttachmentForm.get('isSubmited') as FormControl;
  }

  addAditionalRoomCtrl(): void {
    let additionalRooms = this.addPropertyDetailForm.get('additionalRooms') as FormArray;

    if (additionalRooms.valid && additionalRooms.length < 10) {
      additionalRooms.push(
        new FormControl('')
      );
    } else {
      if (additionalRooms.invalid) {
        this.toasterService.pop('error', 'Error', 'Please enter addition room value.');
      } else {
        this.toasterService.pop('error', 'Error', 'Maximum 10 additional property limit.');
      }
    }
  }

  formSubmit(): void {
    this.addAttachmentFormIsClicked.setValue(true);

    if (this.addAttachmentForm.valid && this.addAttachmentFormIsSubmmited.value === false) {
      this.tempAttachments.push(this.addAttachmentForm.value);
      this.addAttachmentForm.reset();
      this.addAttachmentFormIsSubmmited.setValue(false);
      const formData = new FormData();

      formData.append('comment', this.tempAttachments[0].comment);
      formData.append('docType', 'property');
      formData.append('file', this.uploadFile);
      formData.append('filePath', '');
      formData.append('propertyId', this.propertId);
      formData.append('userId', this.loginUser.userId);

      this.uploadDocumentApi(formData);
    } else {
      this.toasterService.pop('error', 'Error', 'Please select attachment.');
    }

  }

  attachmentSubmit(): void {
    if ((this.addAttachmentForm.valid || this.tempAttachments.length > 0)) {
      this.isFormSubmitted = false;
      this.addAttachment.hide();
      this.attachments = [...this.attachments, ...this.tempAttachments];
      this.tempAttachments = [];

      this.addPropertyDetailForm.get('attachments').setValue(this.attachments);
      // this.toasterService.pop('success', 'Success', 'Attachment data added successfully.');
    } else {
      this.toasterService.pop('error', 'Error', 'Please select attachment.');
    }
  }

  addPropertyDetailFormSubmit(): void {
    this.addPropertyDetailFormIsClicked.setValue(true);

    console.log('this.addPropertyDetailForm : ', this.addPropertyDetailForm.value);
    console.log('this.addPropertyDetailForm invalid : ', this.addPropertyDetailForm.invalid);

    if (this.addPropertyDetailForm.invalid && this.addPropertyDetailFormIsSubmmited.value === false) {
      this.toasterService.pop('error', 'Error', 'Please enter valid values.');
      return;
    } else {
      this.addPropertyDetailFormIsSubmmited.setValue(true);
      this._CommonService.showLoading();
      const reqData = this.addPropertyDetailForm.value;
      console.log(reqData);

      const additionalPropertyDetailsList = [];
      reqData.additionalRooms.forEach(item => {
        const objDet = {
          id: 0,
          propertyAddtionalKey: 'additionalRoom',
          propertyAddtionalType: item,
          propertyAddtionalValue: '1'
        };
        additionalPropertyDetailsList.push(objDet);
      });

      additionalPropertyDetailsList.push({
        id: 0,
        propertyAddtionalKey: 'Furnished',
        propertyAddtionalType: 'fan',
        propertyAddtionalValue: reqData.fan
      });

      additionalPropertyDetailsList.push({
        id: 0,
        propertyAddtionalKey: 'Furnished',
        propertyAddtionalType: 'sofa',
        propertyAddtionalValue: reqData.sofa
      });

      additionalPropertyDetailsList.push({
        id: 0,
        propertyAddtionalKey: 'Furnished',
        propertyAddtionalType: 'tv',
        propertyAddtionalValue: reqData.tv
      });

      additionalPropertyDetailsList.push({
        id: 0,
        propertyAddtionalKey: 'Furnished',
        propertyAddtionalType: 'bed',
        propertyAddtionalValue: reqData.bed
      });
      const obj = {
        additionalPropertyDetails: additionalPropertyDetailsList,
        additionalRoom: reqData.additionalRoom,
        bathRoom: reqData.bathroom,
        bedRoom: reqData.bedroom,
        furnished: reqData.furnished,
        kitchen: reqData.kitchen,
        livingRoom: reqData.livingRoom,
        propertyId: this.propertId
      };
      this._CommonService.post(urlConstant.Property.AddDetail, obj).subscribe((res) => {
        if (!!res) {
          this.toasterService.pop('success', 'Success', res.message);
          this.router.navigate(['/admin/properties/list']);
        } else {
          this.toasterService.pop('error', 'Error', res.message);
          this.router.navigate(['/admin/properties/list']);
        }
      }, (error) => {
        if (error != null) {
          this.toasterService.pop('error', 'Error', error.message);
        }
        this.router.navigate(['/admin/properties/list']);
      }).add(() => {
        this.addPropertyDetailForm.reset();
        this.addPropertyDetailFormIsClicked.setValue(false);
        this.addPropertyDetailFormIsSubmmited.setValue(false);
        this._CommonService.hideLoading();
      });
    }
  }


  isAddAttachmentFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.addAttachmentForm, this.addPropertyDetailFormIsClicked.value, controlName, errorName, notError);
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.addPropertyDetailForm, this.addPropertyDetailFormIsClicked.value, controlName, errorName, notError);
  }

  deleteAttachment(i: number): void {
    this.attachments.splice(i, 1);
  }

  async onChangePhotoFromDevice(event: any) {
    console.log('Event : ', event.target.files);
    this.uploadFile = null;
    if (event.target.files && event.target.files.length > 0) {
      this.uploadFile = event.target.files[0];

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

  showLigthBox(index: number = -1): void {
    console.log('index : ', index);

    if (index >= 0) {
      const images = [];
      for (const key in this.uploadAttachmentList) {
        if (Object.prototype.hasOwnProperty.call(this.uploadAttachmentList, key)) {
          const attachment = this.uploadAttachmentList[key];
          console.log('attachment : ', attachment);

          const image = {
            src: attachment['filePath'],
            caption: attachment['comment'],
            thumb: attachment['filePath']
          };

          images.push(image);
        }
      }

      this.lightbox.open(images, index);
    }
  }

  takePhotoModalOpen() {
    const modalRef = this.modalService.open(TakePhotoModalComponent, { size: 'lg' })
    modalRef.result.then((result) => {
      if (result) {
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

  showTempLigthBox(index: number = -1): void {

    if (index >= 0) {
      const images = [];
      for (const key in this.uploadAttachmentList) {
        if (Object.prototype.hasOwnProperty.call(this.uploadAttachmentList, key)) {
          const attachment = this.uploadAttachmentList[key];


          const image = {
            src: attachment['filePath'],
            caption: attachment['comment'],
            thumb: attachment['filePath']
          };

          images.push(image);
        }
      }

      this.lightbox.open(images, index);
    }
  }

  uploadDocumentApi(obj) {
    this._CommonService.postFormData(urlConstant.Property.UploadDocumentPropertyByPropertyId, obj).subscribe((res) => {
      if (!!res) {
        this.GetDocumentByPropertyId();
        this.toasterService.pop('success', 'Success', res.message);
      } else {
        this.toasterService.pop('error', 'Error', res.message);
      }
    }, (error) => {
      if (error != null) {
        this.toasterService.pop('error', 'Error', error.message);
      }
    })
  }

  GetDocumentByPropertyId() {
    this._CommonService.get<any>(urlConstant.Property.GetDocumentByPropertyId + '?documentType=property&propertyId=' + this.propertId).subscribe((res) => {
      if (!!res) {
        this.uploadAttachmentList =  res.data.Document;
      } else {
        this.toasterService.pop('error', 'Error', res.message);
      }
    }, (error) => {
      if (error != null) {
        this.toasterService.pop('error', 'Error', error.message);
      }
    })
  }

  DeleteDocumentByDocumentId(documentId) {
    this._CommonService.get<any>(urlConstant.Property.DeleteDocumentByDocumentId + '?documentId=' + documentId).subscribe((res) => {
      if (!!res) {
       this.GetDocumentByPropertyId();
      } else {
        this.toasterService.pop('error', 'Error', res.message);
      }
    }, (error) => {
      if (error != null) {
        this.toasterService.pop('error', 'Error', error.message);
      }
    })
  }
}
