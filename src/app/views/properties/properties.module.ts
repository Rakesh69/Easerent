import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PropertiesComponent } from './properties.component';
import { LightboxModule } from 'ngx-lightbox';
//import { ViewPropertyComponent } from './view-property/view-property.component';

@NgModule({
  declarations: [
    PropertiesComponent,
    //ViewPropertyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PropertiesRoutingModule,
    BsDropdownModule,
    LightboxModule,
    ButtonsModule.forRoot()
  ]
})
export class PropertiesModule { }
