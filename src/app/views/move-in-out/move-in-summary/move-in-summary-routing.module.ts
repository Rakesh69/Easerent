import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoveInSummaryComponent } from './move-in-summary.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Summary'
    },
    children: [
      {
        path: '',
        component: MoveInSummaryComponent,
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
export class MoveInSummaryRoutingModule { }
