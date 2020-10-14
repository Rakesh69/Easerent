import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationSettingComponent } from './notification-setting.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notification Setting'
    },
    children: [
      {
        path: '',
        component: NotificationSettingComponent,
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
export class NotificationSettingRoutingModule { }
