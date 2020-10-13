import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferralComponent } from './referral.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Referral'
    },
    children: [
      {
        path: '',
        component: ReferralComponent,
        data: {
          title: ''
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralRoutingModule { }
