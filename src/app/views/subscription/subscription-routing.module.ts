import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Subscription'
    },
    children: [
      {
        path: '',
        component: SubscriptionComponent,
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
export class SubscriptionRoutingModule { }
