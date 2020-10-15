import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDocumentComponent } from './list-document.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'List'
    },
    children: [
      {
        path: '',
        component: ListDocumentComponent,
        data: {
          title: ''
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListDocumentRoutingModule { }
