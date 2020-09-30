import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Globals } from './../../../globals';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.scss']
})
export class AddTenantComponent implements OnInit {

  
  inviteForm: FormGroup;
  isFormSubmitted: boolean = false;
  addedProperty: any = {};

 

  constructor(public formBuilder: FormBuilder, public toasterService: ToasterService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.inviteForm = this.formBuilder.group({
      ownerEmail: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    })
  }

  formSubmit(): void {
    this.isFormSubmitted = true;
   
    if(this.inviteForm.valid) {
      this.addedProperty = this.inviteForm.value;
      this.inviteForm.reset();
      this.isFormSubmitted = false;

      this.toasterService.pop('success', 'Success', 'Invitation sent successfully.');
    }
  }

  
  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.inviteForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }
}
