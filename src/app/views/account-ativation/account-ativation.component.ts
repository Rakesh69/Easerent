import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../common/commonService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-ativation',
  templateUrl: './account-ativation.component.html',
  styleUrls: ['./account-ativation.component.scss']
})
export class AccountAtivationComponent implements OnInit {

  params: any = {};
  constructor(
    public _commonService: CommonService,
    private _activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.params = params;

      if (params['activationCode'] && params['userId']) {
        this.checkActivationCode()
      } else {
        Swal.fire("Good job!", "Your activation link invalid. Try Again!", "success");
      }
    });
  }

  checkActivationCode(): void {
    Swal.fire({
      icon: 'info',
      title: 'Account Activation In Progress!',
      html: 'Please wait for some time.',
      timer: 5000,
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading()
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          icon: 'success',
          title: 'Your Account Activated Successfully!',
          html: 'Please login with your account.',
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Login',
        }).then((res) => {
          this.router.navigateByUrl('/login');
        });
      }
    })
  }
}
