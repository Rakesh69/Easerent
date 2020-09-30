import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Globals } from './../../../globals';
import { Lightbox } from 'ngx-lightbox';
import { DomSanitizer } from '@angular/platform-browser';

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

  @ViewChild('addAttachment', {static: false}) public addAttachment: ModalDirective;
  
  constructor(
    public formBuilder: FormBuilder,
    public toasterService: ToasterService,
    public lightbox: Lightbox,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.addPropertyDetailForm = this.formBuilder.group({
      attachments: new FormControl([]),
      isLivingRoom: new FormControl(true),
      isKitchen: new FormControl(false),
      bedroom: new FormControl('3'),
      bathroom: new FormControl('1'),
      additionalRooms: new FormControl('2'),
      isFurnished: new FormControl(false),
      fan: new FormControl('3'),
      sofa: new FormControl('2'),
      tv: new FormControl('1'),
      bed: new FormControl('3')
    })

    this.addAttachmentForm = this.formBuilder.group({
      attachment: new FormControl([])
    });
  }

  formSubmit(): void {
    this.isFormSubmitted = true;
    console.log('addAttachmentForm : ', this.addAttachmentForm.value);
    
    if(this.addAttachmentForm.valid) {
      // this.attachments.push(this.addAttachmentForm.value);

      this.addPropertyDetailForm.get('attachments').setValue([...this.addPropertyDetailForm.get('attachments').value, ...this.addAttachmentForm.get('attachment').value])
      this.addAttachmentForm.reset();
      this.addAttachmentForm.get('attachment').setValue([]);
      this.isFormSubmitted = false;
      this.addAttachment.hide();
      
      this.toasterService.pop('success', 'Success', 'Attachment data added successfully.');
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
      let attachmentBlobUrls = [];
      for (const key in event.target.files) {
        if (Object.prototype.hasOwnProperty.call(event.target.files, key)) {
          const file = event.target.files[key];
          const blobUrl = await Globals.fileToBlobUrl(file);
          console.log('blobUrl : ', blobUrl);

          attachmentBlobUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
        }
      }

      this.addAttachmentForm.get('attachment').setValue([...this.addAttachmentForm.get('attachment').value, ...attachmentBlobUrls]);   
    }
  }

  showLigthBox(index: number): void {
    if(index) {
      const attachments = this.addPropertyDetailForm.get('attachments').value || [];
      let images = [];
      for (const key in attachments) {
        if (Object.prototype.hasOwnProperty.call(attachments, key)) {
          const attachment = attachments[key];
          const image = {
            src: attachment,
            caption: 'caption / file name',
            thumb: attachment
          };

          images.push(image);
        }
      }

      this.lightbox.open(images, index);
    }
  }
}
