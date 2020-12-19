import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOwnerBrokerRoutingModule } from './add-owner-broker-routing.module';
import { AddOwnerBrokerComponent } from './add-owner-broker.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AddOwnerBrokerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AddOwnerBrokerRoutingModule,
    FormsModule
  ]
})
export class AddOwnerBrokerModule { }
