import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPropertyDetailsRoutingModule } from './add-property-details-routing.module';
import { AddPropertyDetailsComponent } from './add-property-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  declarations: [
    AddPropertyDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    LightboxModule,
    AddPropertyDetailsRoutingModule
  ]
})
export class AddPropertyDetailsModule { }
