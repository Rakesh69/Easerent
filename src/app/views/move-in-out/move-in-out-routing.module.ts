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
          title: 'Move-In'
        }
      },
      {
        path: 'moveOut',
        loadChildren: () => import('./move-out/move-out.module').then(m => m.MoveOutModule),
        data: {
          title: 'Move-Out'
        }
      },
      {
        path: 'summary',
        loadChildren: () => import('./move-in-summary/move-in-summary.module').then(m => m.MoveInSummaryModule),
        data: {
          title: 'Summary'
        }
      },
      {
        path: 'moveOutSummary',
        loadChildren: () => import('./move-out-summary/move-out-summary.module').then(m => m.MoveOutSummaryModule),
        data: {
          title: 'Move Out Summary'
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
