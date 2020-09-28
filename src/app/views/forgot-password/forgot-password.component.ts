import { Component, OnInit } from '@angular/core';
import { dataConstant } from '../../constant/dataConstant';
import { UserService } from '../configration/user/user.service';
import { CommonService } from '../../common/commonService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loginuserdetail: any;
  authenticationData: any = {};
  userData: any = {};
  emailPattren = dataConstant.EmailPattren;
  isSubmit = false;

  constructor(public _commonService: CommonService,
    public _userService: UserService,
    public router: Router) { }

  ngOnInit() {
  }

  forgotPassword(forgotPasswordForm) {
    this.isSubmit = true;
    if (forgotPasswordForm.form.invalid) {
      return;
    } else {
      this._commonService.showLoading();
      this._userService.ForgotPassword(this.authenticationData.Email)
        .subscribe((response: any) => {
          this._commonService.hideLoading();
          if (response && response.status ==200) {
            this._commonService.toastSuccessMsg(null, "Mail sent successfully", null);
            this.isSubmit = false;
          }
          else {
            this.isSubmit = false;
            this._commonService.toastErrorMsg(null, "User is not exist", null);
          }

          this.authenticationData = {};

        }, error => {
          this.isSubmit = false;
          this._commonService.hideLoading();
          if (error != null) {
            this._commonService.toastErrorMsg(null, "User is not exist", null);
          }
        });
    }
  }
}
