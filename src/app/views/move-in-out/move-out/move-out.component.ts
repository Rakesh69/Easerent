import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'angular2-toaster';
import Stepper from 'bs-stepper';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Lightbox } from 'ngx-lightbox';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { Globals } from '../../../globals';
import { TakePhotoModalComponent } from '../../../shared/ngbd-modal-content/custom-components/take-photo-modal/take-photo-modal.component';

@Component({
  selector: 'app-move-out',
  templateUrl: './move-out.component.html',
  styleUrls: ['./move-out.component.scss']
})
export class MoveOutComponent implements OnInit {

  isFormSubmitted: boolean = false;
  isStartMoveIn: boolean = false;
  isWarningModal: boolean = false;
  waringDocumentsForm: FormGroup;
  dangerDocumentsForm: FormGroup;
  addAttachmentForm: FormGroup;

  private stepper: Stepper;

  warningAttachments: any = [];
  dangerAttachments: any = [];
  tempAttachments: any = [];

  @ViewChild('addAttachment', {static: false}) public addAttachment: ModalDirective;

  constructor(
    public formBuilder: FormBuilder,
    public lightbox: Lightbox,
    public toasterService: ToasterService,
    public sanitizer: DomSanitizer,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
    this.initStepper();
    this.createForm();
  }

  initStepper(stepperTo: number = -1): void {
    this.isStartMoveIn = true;

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
    this.waringDocumentsForm = this.formBuilder.group({
      documents: new FormControl([]),
    });

    this.dangerDocumentsForm = this.formBuilder.group({
      documents: new FormControl([]),
    });

    this.addAttachmentForm = this.formBuilder.group({
      attachment: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required]),
      repairCost: new FormControl('', [Validators.required]),
    });
  }

  addDocumentSubmit(): void {
    this.isFormSubmitted = true;
    console.log('addAttachmentForm : ', this.addAttachmentForm.value);
    
    if(this.addAttachmentForm.valid) {
      // this.attachments.push(this.addAttachmentForm.value);
      const addAttachmentFormData = this.addAttachmentForm.value;
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
      if(this.isWarningModal) {
        this.warningAttachments = [...this.warningAttachments, ...this.tempAttachments];
        this.waringDocumentsForm.get('documents').setValue(this.warningAttachments);
      } else {
        this.dangerAttachments = [...this.dangerAttachments, ...this.tempAttachments];
        this.dangerDocumentsForm.get('documents').setValue(this.dangerAttachments);
      }
      this.tempAttachments = [];
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


  deleteAttachment(i: number, isWarning: boolean = false): void {
    if(isWarning) {
      this.warningAttachments.splice(i, 1);
    } else {
      this.dangerAttachments.splice(i, 1);
    }
  }

  showLigthBox(index: number = -1, isWarning: boolean = false): void {
    console.log('index : ', index);
    
    if(index >= 0) {
      let images = [];
      const attachments = isWarning ? this.warningAttachments : this.dangerAttachments;
      for (const key in attachments) {
        if (Object.prototype.hasOwnProperty.call(attachments, key)) {
          const attachment = attachments[key];
          console.log('attachment : ', attachment);
          
          const image = {
            src: attachment['attachment'],
            caption: attachment['comments'],
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
    this.stepper.previous();
  }

  next() {
    this.isFormSubmitted = false;
    this.stepper.next();
  }

  isAddAttachmentFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.addAttachmentForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);                       
  }
}
