import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantsComponent } from './tenants.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tenants'
    },
    children: [
      {
        path: '',
        component: TenantsComponent,
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
export class TenantsRoutingModule { }
