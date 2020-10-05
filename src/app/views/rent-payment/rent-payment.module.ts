import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentPaymentRoutingModule } from './rent-payment-routing.module';
import { RentPaymentComponent } from './rent-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    RentPaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RentPaymentRoutingModule,
    ModalModule.forRoot(),
  ]
})
export class RentPaymentModule { }
