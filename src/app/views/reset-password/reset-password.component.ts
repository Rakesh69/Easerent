import { Component, OnInit } from '@angular/core';
import { dataConstant } from '../../constant/dataConstant';
import { CommonService } from '../../common/commonService';
import { UserService } from '../configration/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loginuserdetail: any;
  resetPasswordModel: any = {};
  userData: any = {};
  isSubmit = false;
  passwordPattern = dataConstant.PasswordPattern;
  
  constructor(public _commonService: CommonService,
    public _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.resetPasswordModel.UserId = params['userId'];
      this.resetPasswordModel.Token = params['token']; 
    });
  }

  resetPasssword(resetPasswordForm) {
    this.isSubmit = true;
    if (resetPasswordForm.form.invalid) {
      return;
    }
    
    if (this.resetPasswordModel && this.resetPasswordModel.Password != this.resetPasswordModel.ConfirmPassword)
      return;
    
      this._commonService.showLoading();
      this._userService.ResetPassword(this.resetPasswordModel)
        .subscribe((response: any) => {
          this._commonService.hideLoading();
          if (response && response.status == 200) {
            this._commonService.toastSuccessMsg(null, "Password reset successfully", null);
            this.router.navigate(['/login']);
          }
          else {
            this.isSubmit = false;
            this._commonService.toastErrorMsg(null,  "Reset password link is invalid", null);
          }

          //this.router.navigate(['/login']);
         // this.resetPasswordModel = {};

        }, error => {
          this.isSubmit = false;
          this._commonService.hideLoading();
          if (error != null) {
            this._commonService.toastErrorMsg(null, "Reset password link is invalid", null);
          }
        });
  }

}
