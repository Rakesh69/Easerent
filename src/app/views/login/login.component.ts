import { Component, OnInit } from '@angular/core';
import { messageConstant } from '../../constant/messageConstant';
import { dataConstant } from '../../constant/dataConstant';
import { CommonService } from '../../common/commonService';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginuserdetail: any;
  authenticationData: any = {};
  userData: any = {};
  emailPattren = dataConstant.EmailPattren;
  isSubmit = false;

  constructor(public _CommonService: CommonService,
    public _LoginService: LoginService,
    public router: Router) { }

  ngOnInit() {
    // this._CommonService.showLoading();
  }

  onLoggedin(loginform) {
    this.isSubmit = true;
    if (loginform.form.invalid) {
      return;
    } else {
      this._CommonService.showLoading();
      localStorage.setItem('token', JSON.stringify("ASerfdsewrewrvnvjfkkfgfkdgfdgfdkgfdkg"));
      this.router.navigate(['/dashboard']);
      this._CommonService.hideLoading();
      //this._LoginService.login(this.authenticationData)
      //    .subscribe((response: any) => {
      //        this._CommonService.hideLoading();
      //        if (response && response.data) {
      //            var token = response.data.token; //response;
      //            var user = response.data.user;
      //            localStorage.setItem('token', JSON.stringify(token));
      //            localStorage.setItem('user', JSON.stringify(user));
      //            localStorage.setItem('roleRights',JSON.stringify(response.data.roleRights))
      //            this.router.navigate(['/dashboard']);
      //        }
      //        else {
      //            this.isSubmit = false;
      //            this._CommonService.toastErrorMsg(null, response.message, null);
      //        }

      //    }, error => {
      //        this.isSubmit = false;
      //        this._CommonService.hideLoading();
      //        if (error != null) {
      //            if (error.status == 400) {
      //                this._CommonService.toastErrorMsg(null, messageConstant.Common.Invalid, null);
      //            }
      //            else if (error.status == 401) {
      //                this._CommonService.toastErrorMsg(null, messageConstant.Common.UnAuthorized, null);
      //            }
      //            else {
      //                this._CommonService.toastErrorMsg(null, error.message, null);
      //            }
      //        }
      //    });
    }
  }

}
