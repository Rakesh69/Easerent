import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentPaymentDetailRoutingModule } from './rent-payment-detail-routing.module';
import { RentPaymentDetailComponent } from './rent-payment-detail.component';
import { LightboxModule } from 'ngx-lightbox';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    RentPaymentDetailComponent
  ],
  imports: [
    CommonModule,
    LightboxModule,
    ModalModule.forRoot(),
    RentPaymentDetailRoutingModule
  ]
})
export class RentPaymentDetailModule { }
