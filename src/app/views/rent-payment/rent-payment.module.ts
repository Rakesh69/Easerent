import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentPaymentRoutingModule } from './rent-payment-routing.module';
import { RentPaymentComponent } from './rent-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { WebcamModule } from 'ngx-webcam';
import { LightboxModule } from 'ngx-lightbox';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbRootModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    RentPaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RentPaymentRoutingModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    WebcamModule,
    NgbRootModule,
    LightboxModule,
    PerfectScrollbarModule,
  ]
})
export class RentPaymentModule { }
