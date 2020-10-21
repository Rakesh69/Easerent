import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoveOutSummaryRoutingModule } from './move-out-summary-routing.module';
import { MoveOutSummaryComponent } from './move-out-summary.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { LightboxModule } from 'ngx-lightbox';


@NgModule({
  declarations: [
    MoveOutSummaryComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    LightboxModule,
    MoveOutSummaryRoutingModule
  ]
})
export class MoveOutSummaryModule { }
