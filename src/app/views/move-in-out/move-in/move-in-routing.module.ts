import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoveInComponent } from './move-in.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Move-In'
    },
    children: [
      {
        path: '',
        component: MoveInComponent,
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
export class MoveInRoutingModule { }
