import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentPaymentDetailComponent } from './rent-payment-detail.component';


const routes: Routes = [
  {
    path: '',
    component: RentPaymentDetailComponent,
    data: {
      title: 'Rent Payment Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentPaymentDetailRoutingModule { }
