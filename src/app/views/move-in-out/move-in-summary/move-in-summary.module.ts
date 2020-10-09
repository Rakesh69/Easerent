import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoveInSummaryRoutingModule } from './move-in-summary-routing.module';
import { MoveInSummaryComponent } from './move-in-summary.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { LightboxModule } from 'ngx-lightbox';


@NgModule({
  declarations: [
    MoveInSummaryComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    LightboxModule,
    MoveInSummaryRoutingModule
  ]
})
export class MoveInSummaryModule { }
