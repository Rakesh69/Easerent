import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillsUtilitiesComponent } from './bills-utilities.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bills/Utilities'
    },
    children: [
      {
        path: '',
        component: BillsUtilitiesComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'add',
        loadChildren: () => import('./add-edit-bills-utilities/add-edit-bills-utilities.module').then(m => m.AddEditBillsUtilitiesModule),
        data: {
          title: 'Add'
        }
      },
      {
        path: 'edit',
        loadChildren: () => import('./add-edit-bills-utilities/add-edit-bills-utilities.module').then(m => m.AddEditBillsUtilitiesModule),
        data: {
          title: 'Edit'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillsUtilitiesRoutingModule { }
