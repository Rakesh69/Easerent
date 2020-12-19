import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import Swal from 'sweetalert2';
import { CommonService } from '../../common/commonService';
import { isNumber } from '../../common/custom.validator';
import { urlConstant } from '../../constant/urlConstant';
import { Globals } from '../../globals';
import { isAlphabet, isValidEmail, MustMatch } from '../../shared/ngbd-modal-content/validators/custom.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(
    public _CommonService: CommonService,
    public toasterService: ToasterService,
    public formBuilder: FormBuilder,
    public router: Router,
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.signUpForm = this.formBuilder.group({
      "firstName": new FormControl('', [Validators.required, isAlphabet]),
      "lastName": new FormControl('', [Validators.required, isAlphabet]),
      "email": new FormControl('', [Validators.required, isValidEmail]),
      "number": new FormControl('', [Validators.required, isNumber, Validators.minLength(10), Validators.maxLength(10)]),
      "password": new FormControl('', [Validators.required]),
      "roleId": new FormControl('111', [Validators.required]),
      "confirmPassword": new FormControl('', [Validators.required]),
      "isTermAccepted": new FormControl(false),
      "isClicked": new FormControl(false),
      "isSubmited": new FormControl(false),
    },{
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get signUpFormIsClicked(): FormControl {
    return this.signUpForm.get('isClicked') as FormControl;
  }

  get signUpFormIsSubmmited(): FormControl {
    return this.signUpForm.get('isSubmited') as FormControl;
  }

  signUpFormSubmit(): void {
    this.signUpFormIsClicked.setValue(true);

    if (this.signUpForm.invalid && this.signUpFormIsSubmmited.value === false) {
      return;
    } else {
      if(this.signUpForm.get('isTermAccepted').value === false) {
        this.toasterService.pop('error', 'Error', "Please accept terms of use and privacy policy");
        return;
      }

      this.signUpFormIsSubmmited.setValue(true);
      this._CommonService.showLoading();

      const signUpData = this.signUpForm.value;
      signUpData['userName'] = signUpData['email'];
      signUpData['createdBy'] = 'y';
      const reqData = {
        createdBy: signUpData.createdBy,
        email: signUpData.email,
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        number: signUpData.number,
        password: signUpData.password,
        roleId: signUpData.roleId,
        username: signUpData.userName
      };
      this._CommonService.post(urlConstant.Auth.Registration, JSON.stringify(reqData)).subscribe((res) => {
        debugger
        if (res && res['Status'] === "200") {
          this.toasterService.pop('success', 'Success', res.message);
          this.router.navigate(['/login']);
        } else {
          this.toasterService.pop('error', 'Error', res.message);
        }
      }, (error) => {
        if (error != null) {
          this.toasterService.pop('error', 'Error', error.message);
        }
      }).add(() => {
        this.signUpFormIsClicked.setValue(false);
        this.signUpFormIsSubmmited.setValue(false);
        this._CommonService.hideLoading();
      });
    }
  }

  isFormSubmittedAndError(controlName: string, errorName: string = '', notError: Array<string> = new Array()): any {
    return Globals.isFormSubmittedAndError(this.signUpForm, this.signUpForm.get('isClicked').value, controlName, errorName, notError);
  }
}
