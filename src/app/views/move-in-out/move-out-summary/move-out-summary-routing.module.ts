import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoveOutSummaryComponent } from './move-out-summary.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Move Out Summary'
    },
    children: [
      {
        path: '',
        component: MoveOutSummaryComponent,
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
export class MoveOutSummaryRoutingModule { }
