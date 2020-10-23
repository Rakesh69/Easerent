import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListDocumentRoutingModule } from './list-document-routing.module';
import { ListDocumentComponent } from './list-document.component';
import { WebcamModule } from 'ngx-webcam';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbRootModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListDocumentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ModalModule.forRoot(),
    WebcamModule,
    NgbRootModule,
    ListDocumentRoutingModule
  ]
})
export class ListDocumentModule { }
