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
    this.addAttachmentForm = this.formBuilder.group({
      attachment: new FormControl([]),
      isLivingRoom: new FormControl(true),
      isKitchen: new FormControl(''),
      bedroom: new FormControl('3'),
      bathroom: new FormControl('1'),
      additionalRooms: new FormControl('2'),
      isFurnished: new FormControl(false),
      fan: new FormControl('3'),
      sofa: new FormControl('2'),
      tv: new FormControl('1'),
      bed: new FormControl('3')
    })
  }

  formSubmit(): void {
    this.isFormSubmitted = true;
    console.log('addAttachmentForm : ', this.addAttachmentForm.value);
    
    if(this.addAttachmentForm.valid) {
      this.attachments.push(this.addAttachmentForm.value);

      this.addAttachmentForm.reset();
      this.isFormSubmitted = false;
      this.addAttachment.hide();
      
      this.toasterService.pop('success', 'Success', 'Attachment data added successfully.');
    }
  }

  
  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    const otherError: any = this.addAttachmentForm.controls[controlName].errors;
    
    if (this.isFormSubmitted && otherError) {
        return errorName == '' ? true : (otherError ? !Object.keys(otherError).some(err => notError.includes(err)) : true) ? this.addAttachmentForm.controls[controlName].hasError(errorName) : false;
    } 
    return false;                
  }

  async onChangePhotoFromDevice(event: any) {
    console.log('Event : ', event.target.files);

    if(event.target.files && event.target.files.length > 0) {
      const blobUrl = await Globals.fileToBlobUrl(event.target.files[0]);
      console.log('blobUrl : ', blobUrl);
      this.addAttachmentForm.get('attachment').setValue(this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
    }
  }

  showLigthBox(src: string): void {
    if(src) {
      const images = [{
        src: src,
        caption: 'caption / file name',
        thumb: src
      }];

      this.lightbox.open(images, 0);
    }
  }
}
