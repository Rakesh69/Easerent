import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTenantRoutingModule } from './add-tenant-routing.module';
import { AddTenantComponent } from './add-tenant.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddTenantComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddTenantRoutingModule
  ]
})
export class AddTenantModule { }
