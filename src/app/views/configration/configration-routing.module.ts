import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { ProductCategoryComponent } from './product-category/product-category.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
        {
          path: 'Role',
          component: RoleComponent,
          data: {
            title: 'Role'
          }
        },
        {
          path: 'User',
          component: UserComponent,
          data: {
            title: 'User'
          }
        },
        {
          path: 'ProductsCategory',
          component: ProductCategoryComponent,
          data: {
            title: 'Products Category'
          }
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigrationRoutingModule { }
