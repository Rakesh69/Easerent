import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../common/commonService';
import Swal from 'sweetalert2';
import { urlConstant } from '../../constant/urlConstant';

@Component({
  selector: 'app-account-ativation',
  templateUrl: './account-ativation.component.html',
  styleUrls: ['./account-ativation.component.scss']
})
export class AccountAtivationComponent implements OnInit {

  token: any;
  params: any = {};
  constructor(
    public _commonService: CommonService,
    private _activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.params = params;
      if (params['token']) {
        this.token = params['token'];
        this.activateAccountDetail();
        // this.checkActivationCode()
      }
      // else {
      //   Swal.fire('Good job!', 'Your activation link invalid. Try Again!', 'success');
      // }
    });


  }

  // checkActivationCode(): void {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Account Activation In Progress!',
  //     html: 'Please wait for some time.',
  //     timer: 5000,
  //     timerProgressBar: true,
  //     showCancelButton: false,
  //     showConfirmButton: false,
  //     willOpen: () => {
  //       Swal.showLoading()
  //     }
  //   }).then((result) => {
  //     debugger
  //     if (result.dismiss === Swal.DismissReason.timer) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Your Account Activated Successfully!',
  //         html: 'Please login with your account.',
  //         confirmButtonText: '<i class="fa fa-thumbs-up"></i> Login',
  //       }).then((res) => {
  //         this.router.navigateByUrl('/login');
  //       });
  //     }
  //   });
  // }

  activateAccountDetail() {
    this._commonService.showLoading();
    this._commonService.get(urlConstant.Auth.ActivateAccount + '?token=' + this.token).subscribe((res) => {
      if (!!res && res['Status'] === '200') {
        Swal.fire({
          icon: 'success',
          title: 'Your Account Activated Successfully!',
          html: 'Please login with your account.',
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Login',
        }).then((ressponse) => {
          this.router.navigateByUrl('/login');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: res['message'],
          html: 'Please try again.'
        });
      }
    }, (error) => {
      console.log('error : ', error);

      if (error != null) {
        Swal.fire({
          icon: 'error',
          title: error.message,
          html: 'Please try again.',
        });
      }
    })
  }
}
