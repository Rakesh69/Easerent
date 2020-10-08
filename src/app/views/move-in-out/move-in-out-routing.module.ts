import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoveInOutComponent } from './move-in-out.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Move-In/Move-Out'
    },
    children: [
      {
        path: '',
        component: MoveInOutComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'moveIn',
        loadChildren: () => import('./move-in/move-in.module').then(m => m.MoveInModule),
        data: {
          title: 'Move-Id'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoveInOutRoutingModule { }
