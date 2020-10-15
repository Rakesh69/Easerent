import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents.component';
import { ListDocumentComponent } from './list-document/list-document.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Documents'
    },
    children: [
      {
        path: '',
        component: DocumentsComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'list',
        loadChildren: () => import('./list-document/list-document.module').then(m => m.ListDocumentModule),
        data: {
          title: 'List'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
