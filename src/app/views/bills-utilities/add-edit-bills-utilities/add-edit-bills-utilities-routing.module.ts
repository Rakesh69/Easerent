import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditBillsUtilitiesComponent } from './add-edit-bills-utilities.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AddEditBillsUtilitiesComponent,
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
export class AddEditBillsUtilitiesRoutingModule { }
