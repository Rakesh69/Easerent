import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsUtilitiesRoutingModule } from './bills-utilities-routing.module';
import { BillsUtilitiesComponent } from './bills-utilities.component';

@NgModule({
  declarations: [
    BillsUtilitiesComponent
  ],
  imports: [
    CommonModule,
    BillsUtilitiesRoutingModule
  ]
})
export class BillsUtilitiesModule { }
