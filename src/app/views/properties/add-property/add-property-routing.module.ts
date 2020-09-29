import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './add-property.component';

const routes: Routes = [
  {
    path: '',
    component: AddPropertyComponent,
    data: {
      title: 'Add Property'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPropertyRoutingModule { }
