import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Change Password'
    },
    children: [
      {
        path: '',
        redirectTo: 'update'
      },
      {
        path: 'update',
        component: ChangePasswordComponent,
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
export class ChangePasswordRoutingModule { }
