import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Globals } from '../../globals';
import { isNumber, isValidEmail } from '../../shared/ngbd-modal-content/validators/custom.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, public toasterService: ToasterService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, isValidEmail, Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [Validators.required, isNumber, Validators.minLength(10),  Validators.maxLength(10)])
    })
  }

  formSubmit(): void {
    this.isFormSubmitted = true;
   
    if(this.profileForm.valid) {
      this.profileForm.reset();
      this.isFormSubmitted = false;

      this.toasterService.pop('success', 'Success', 'Profile updated successfully.');
    }
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.profileForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }
}
