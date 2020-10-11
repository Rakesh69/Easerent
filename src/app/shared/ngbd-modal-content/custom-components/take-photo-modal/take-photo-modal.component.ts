import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-take-photo-modal',
  templateUrl: './take-photo-modal.component.html',
  styleUrls: ['./take-photo-modal.component.scss']
})
export class TakePhotoModalComponent implements OnInit {

  takePhotoForm: FormGroup;
  isFormSubmitted: boolean = false;
  deviceId: string;
  public multipleWebcamsAvailable = false;
  public errors: WebcamInitError[] = [];

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  
  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    public toasterService: ToasterService
  ) { }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
    
    this.createForm();
  }

  createForm(): void {
    this.takePhotoForm = this.formBuilder.group({
      attachment: new FormControl('', [Validators.required])
    });
  }

  takePhotoSubmit(): void {
    this.isFormSubmitted = true;
    console.log('addAttachmentForm : ', this.takePhotoForm.value);
    
    if(this.takePhotoForm.valid) {
      // this.addAttachmentForm.get('attachment').setValue(this.takePhotoForm.get('attachment').value);
      this.activeModal.close(this.takePhotoForm.get('attachment').value);
      this.takePhotoForm.reset();
      this.isFormSubmitted = false;
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
