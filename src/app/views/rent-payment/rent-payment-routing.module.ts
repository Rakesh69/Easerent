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
          title: 'Rent Payment'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentPaymentRoutingModule { }
