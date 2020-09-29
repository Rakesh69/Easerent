import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOwnerBrokerComponent } from './add-owner-broker.component';

const routes: Routes = [
  {
    path: '',
    component: AddOwnerBrokerComponent,
    data: {
      title: 'Add Owner'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddOwnerBrokerRoutingModule { }
