import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Globals } from '../../globals';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, public toasterService: ToasterService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    })
  }

  formSubmit(): void {
    this.isFormSubmitted = true;
   
    if(this.changePasswordForm.valid) {
      this.changePasswordForm.reset();
      this.isFormSubmitted = false;

      this.toasterService.pop('success', 'Success', 'Password Changed.');
    }
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.changePasswordForm, this.isFormSubmitted ? 1 : 0, controlName, errorName, notError);               
  }
}
