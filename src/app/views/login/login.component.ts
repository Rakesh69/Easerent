import { Component, OnInit } from '@angular/core';
import { messageConstant } from '../../constant/messageConstant';
import { dataConstant } from '../../constant/dataConstant';
import { CommonService } from '../../common/commonService';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isPassword, isValidEmail } from '../../shared/ngbd-modal-content/validators/custom.validator';
import { Globals } from '../../globals';
import { urlConstant } from '../../constant/urlConstant';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public _CommonService: CommonService,
    public toasterService: ToasterService,
    public formBuilder: FormBuilder,
    public router: Router,
  ) {
    this.createForm();
  }

  ngOnInit() {
    // this._CommonService.showLoading();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      "email": new FormControl('', [Validators.required, isValidEmail]),
      "password": new FormControl('', [Validators.required]),
      "isClicked": new FormControl(false),
      "isSubmited": new FormControl(false),
    });
  }

  get loginFormIsClicked(): FormControl {
    return this.loginForm.get('isClicked') as FormControl;
  }

  get loginFormIsSubmmited(): FormControl {
    return this.loginForm.get('isSubmited') as FormControl;
  }

  loginFormSubmit() {
    this.loginFormIsClicked.setValue(true);

    if (this.loginForm.invalid && this.loginFormIsSubmmited.value === false) {
      return;
    } else {
      this.loginFormIsSubmmited.setValue(true);
      this._CommonService.showLoading();

      this._CommonService.post(urlConstant.Auth.Login, this.loginForm.value).subscribe((res) => {
        if (!!res && res['Status'] === '200') {
          // console.log("res['UserDetails'] : ", JSON.parse (res['UserDetails'].replace('UserDetails', '').replace("=", ":").trim()));

          localStorage.setItem('token', res['accessToken']);
          localStorage.setItem('user', JSON.stringify(res.data.UserDetails));
          localStorage.setItem('role', JSON.stringify(res.data.UserDetails.roles));
          this.toasterService.pop('success', 'Success', res.Message);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.toasterService.pop('error', 'Error', res.Message);
        }
      }, (error) => {
        console.log('error : ', error);

        if (error != null) {
          this.toasterService.pop('error', 'Error', error.message);
        }
      }).add(() => {
        this.loginFormIsClicked.setValue(false);
        this.loginFormIsSubmmited.setValue(false);
        this._CommonService.hideLoading();
      });
    }
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.loginForm, this.loginForm.get('isClicked').value, controlName, errorName, notError);
  }
}
