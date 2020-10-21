import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LightboxModule } from 'ngx-lightbox';
import { WebcamModule } from 'ngx-webcam';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbRootModule } from '@ng-bootstrap/ng-bootstrap';
import { MoveOutComponent } from './move-out.component';
import { MoveOutRoutingModule } from './move-out-routing.module';


@NgModule({
  declarations: [
    MoveOutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ModalModule.forRoot(),
    WebcamModule,
    LightboxModule,
    NgbRootModule,
    MoveOutRoutingModule
  ]
})
export class MoveOutModule { }
