import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPropertyRoutingModule } from './add-property-routing.module';
import { AddPropertyComponent } from './add-property.component';

@NgModule({
  declarations: [
    AddPropertyComponent
  ],
  imports: [
    CommonModule,
    AddPropertyRoutingModule
  ]
})
export class AddPropertyModule { }
