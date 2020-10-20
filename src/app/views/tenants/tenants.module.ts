import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantsRoutingModule } from './tenants-routing.module';
import { TenantsComponent } from './tenants.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TenantsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TenantsRoutingModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ]
})
export class TenantsModule { }
