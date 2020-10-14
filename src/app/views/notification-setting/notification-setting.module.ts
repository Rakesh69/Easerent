import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationSettingRoutingModule } from './notification-setting-routing.module';
import { NotificationSettingComponent } from './notification-setting.component';


@NgModule({
  declarations: [
    NotificationSettingComponent
  ],
  imports: [
    CommonModule,
    NotificationSettingRoutingModule
  ]
})
export class NotificationSettingModule { }
