import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentPaymentRoutingModule } from './rent-payment-routing.module';
import { RentPaymentComponent } from './rent-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RentPaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RentPaymentRoutingModule
  ]
})
export class RentPaymentModule { }
