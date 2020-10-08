import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoveInRoutingModule } from './move-in-routing.module';
import { MoveInComponent } from './move-in.component';
import { LightboxModule } from 'ngx-lightbox';
import { WebcamModule } from 'ngx-webcam';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule({
  declarations: [
    MoveInComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ModalModule.forRoot(),
    WebcamModule,
    LightboxModule,
    MoveInRoutingModule
  ]
})
export class MoveInModule { }
