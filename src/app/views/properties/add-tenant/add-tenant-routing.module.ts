import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTenantComponent } from './add-tenant.component';

const routes: Routes = [
  {
    path: '',
    component: AddTenantComponent,
    data: {
      title: 'Add Tenant'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTenantRoutingModule { }
