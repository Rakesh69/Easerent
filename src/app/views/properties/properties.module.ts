import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PropertiesComponent } from './properties.component';
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  declarations: [
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PropertiesRoutingModule,
    ChartsModule,
    BsDropdownModule,
    LightboxModule,
    ButtonsModule.forRoot()
  ]
})
export class PropertiesModule { }
