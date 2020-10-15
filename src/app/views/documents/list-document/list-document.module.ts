import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListDocumentRoutingModule } from './list-document-routing.module';
import { ListDocumentComponent } from './list-document.component';


@NgModule({
  declarations: [
    ListDocumentComponent
  ],
  imports: [
    CommonModule,
    ListDocumentRoutingModule
  ]
})
export class ListDocumentModule { }
