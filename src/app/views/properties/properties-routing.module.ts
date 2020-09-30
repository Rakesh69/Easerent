import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesComponent } from './properties.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Properties'
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: PropertiesComponent,
        data: {
          title: 'Properties'
        }
      },
      {
        path: 'add',
        loadChildren: () => import('./add-property/add-property.module').then(m => m.AddPropertyModule)
      },
      {
        path: 'addOwner',
        loadChildren: () => import('./add-owner-broker/add-owner-broker.module').then(m => m.AddOwnerBrokerModule)
      },
      {
        path: 'addBroker',
        loadChildren: () => import('./add-owner-broker/add-owner-broker.module').then(m => m.AddOwnerBrokerModule)
      },
      {
        path: 'addTenant',
        loadChildren: () => import('./add-tenant/add-tenant.module').then(m => m.AddTenantModule)
      },
      {
        path: 'addPropertyDetails',
        loadChildren: () => import('./add-property-details/add-property-details.module').then(m => m.AddPropertyDetailsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
