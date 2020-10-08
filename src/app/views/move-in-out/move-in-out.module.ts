import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoveInOutRoutingModule } from './move-in-out-routing.module';
import { MoveInOutComponent } from './move-in-out.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    MoveInOutComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    MoveInOutRoutingModule
  ]
})
export class MoveInOutModule { }
