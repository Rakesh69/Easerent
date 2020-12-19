import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPropertyComponent } from './view-property.component';
import { ViewPropertyRoutingModule } from './view-property-routing.module';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    ViewPropertyComponent
  ],
  imports: [
    CommonModule,
    ViewPropertyRoutingModule,
    FormsModule,
    CollapseModule.forRoot()
  ]
})
export class ViewPropertyModule { }
