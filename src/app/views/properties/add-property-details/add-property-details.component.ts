import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Globals } from './../../../globals';
import { Lightbox } from 'ngx-lightbox';
import { DomSanitizer } from '@angular/platform-browser';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-add-property-details',
  templateUrl: './add-property-details.component.html',
  styleUrls: ['./add-property-details.component.scss']
})
export class AddPropertyDetailsComponent implements OnInit {

  addPropertyDetailForm: FormGroup;
  addAttachmentForm: FormGroup;
  takePhotoForm: FormGroup;
  isFormSubmitted: boolean = false;
  attachments: any = [];
  tempAttachments: any = [];
  deviceId: string;
  config = {
    keyboard: true,
    ignoreBackdropClick: false
  };
  public multipleWebcamsAvailable = false;
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  @ViewChild('addAttachment', {static: false}) public addAttachment: ModalDirective;
  @ViewChild('takePhotoModal', {static: false}) public takePhotoModal: ModalDirective;
  
  constructor(
    public formBuilder: FormBuilder,
    public toasterService: ToasterService,
    public lightbox: Lightbox,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
    this.createForm();
  }

  createForm(): void {
    this.addPropertyDetailForm = this.formBuilder.group({
      attachments: new FormControl([]),
      isLivingRoom: new FormControl(true),
      isKitchen: new FormControl(false),
      bedroom: new FormControl(3),
      bathroom: new FormControl(1),
      additionalRooms: new FormArray([]),
      isFurnished: new FormControl(true),
      fan: new FormControl(3),
      sofa: new FormControl(2),
      tv: new FormControl(1),
      bed: new FormControl(3)
    })

    this.addAttachmentForm = this.formBuilder.group({
      attachment: new FormControl('', [Validators.required]),
      roomType: new FormControl('', [Validators.required])
    });

    this.takePhotoForm = this.formBuilder.group({
      attachment: new FormControl('', [Validators.required])
    });

    this.addAditionalRoomCtrl();
  }

  addAditionalRoomCtrl(): void {
    let additionalRooms= this.addPropertyDetailForm.get('additionalRooms') as FormArray;

    if(additionalRooms.length < 10) {
      additionalRooms.push(
        new FormControl()
      );
    } else {
      this.toasterService.pop('error', 'Error', 'Maximum 10 additional property limit.');
    }
  }

  formSubmit(): void {
    this.isFormSubmitted = true;
    console.log('addAttachmentForm : ', this.addAttachmentForm.value);
    
    if(this.addAttachmentForm.valid) {
      // this.attachments.push(this.addAttachmentForm.value);

      this.tempAttachments.push(this.addAttachmentForm.value);
      this.addAttachmentForm.reset();
      this.isFormSubmitted = false;
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
      // this.toasterService.pop('success', 'Success', 'Attachment data added successfully.');
    } else {
      this.toasterService.pop('error', 'Error', 'Please select attachment.');
    }
  }

  addPropertyDetailFormSubmit(): void {
    this.isFormSubmitted = true;
    console.log('addPropertyDetailForm : ', this.addPropertyDetailForm.value);
    
    if(this.addPropertyDetailForm.valid) {
      // this.attachments.push(this.addAttachmentForm.value);

      this.addPropertyDetailForm.reset();
      this.isFormSubmitted = false;
      
      this.toasterService.pop('success', 'Success', 'Attachment data added successfully.');
    }
  }

  
  isAddAttachmentFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    const otherError: any = this.addAttachmentForm.controls[controlName].errors;
    
    if (this.isFormSubmitted && otherError) {
        return errorName == '' ? true : (otherError ? !Object.keys(otherError).some(err => notError.includes(err)) : true) ? this.addAttachmentForm.controls[controlName].hasError(errorName) : false;
    } 
    return false;                
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    const otherError: any = this.addPropertyDetailForm.controls[controlName].errors;
    
    if (this.isFormSubmitted && otherError) {
        return errorName == '' ? true : (otherError ? !Object.keys(otherError).some(err => notError.includes(err)) : true) ? this.addPropertyDetailForm.controls[controlName].hasError(errorName) : false;
    } 
    return false;                
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
            caption: attachment['roomType'],
            thumb: attachment['attachment']
          };

          images.push(image);
        }
      }

      this.lightbox.open(images, index);
    }
  }


  takePhotoSubmit(): void {
    this.isFormSubmitted = true;
    console.log('addAttachmentForm : ', this.takePhotoForm.value);
    
    if(this.takePhotoForm.valid) {
      this.addAttachmentForm.get('attachment').setValue(this.takePhotoForm.get('attachment').value);
      this.takePhotoForm.reset();
      this.isFormSubmitted = false;
      this.takePhotoModal.hide();
    } else {
      this.toasterService.pop('error', 'Error', 'Please select attachment.');
    }
  }
  

  public triggerSnapshot(): void {
    this.trigger.next();
  }


  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage.imageAsDataUrl);
    this.takePhotoForm.get('attachment').setValue(webcamImage.imageAsDataUrl);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}
