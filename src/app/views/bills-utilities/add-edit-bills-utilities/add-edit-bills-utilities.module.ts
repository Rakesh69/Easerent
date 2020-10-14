import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditBillsUtilitiesRoutingModule } from './add-edit-bills-utilities-routing.module';
import { AddEditBillsUtilitiesComponent } from './add-edit-bills-utilities.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddEditBillsUtilitiesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddEditBillsUtilitiesRoutingModule
  ]
})
export class AddEditBillsUtilitiesModule { }
