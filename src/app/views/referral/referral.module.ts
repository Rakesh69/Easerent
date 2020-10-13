import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralRoutingModule } from './referral-routing.module';
import { ReferralComponent } from './referral.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReferralComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReferralRoutingModule
  ]
})
export class ReferralModule { }
