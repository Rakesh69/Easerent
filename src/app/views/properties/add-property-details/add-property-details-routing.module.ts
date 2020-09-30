import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyDetailsComponent } from './add-property-details.component';

const routes: Routes = [
  {
    path: '',
    component: AddPropertyDetailsComponent,
    data: {
      title: 'Add Additional Property Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPropertyDetailsRoutingModule { }
