import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentPaymentComponent } from './rent-payment.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Rent Payment'
    },
    children: [
      {
        path: '',
        redirectTo: 'start'
      },
      {
        path: 'start',
        component: RentPaymentComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'summary',
        loadChildren: () => import('./rent-payment-detail/rent-payment-detail.module').then(m => m.RentPaymentDetailModule),
        data: {
          title: 'Rent Payment Summary'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentPaymentRoutingModule { }
