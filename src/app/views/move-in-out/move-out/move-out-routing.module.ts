import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoveOutComponent } from './move-out.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Move-Out'
    },
    children: [
      {
        path: '',
        component: MoveOutComponent,
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
export class MoveOutRoutingModule { }
