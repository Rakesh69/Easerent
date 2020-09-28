import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigrationRoutingModule } from './configration-routing.module';
import { DataTableModule } from 'angular2-datatable';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RoleComponent } from './role/role.component';
import { RoleFilterPipe } from './role/role.filter.pipe';
import { NgbTypeaheadModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import { UserFilterPipe } from './user/user.filter.pipe';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductCategoryFilterPipe } from './product-category/product-category-filter.pipe';
import { ProductCategoryService } from './product-category/product-category.service';

@NgModule({
  declarations: [RoleFilterPipe, RoleComponent,UserComponent, UserFilterPipe,ProductCategoryFilterPipe, ProductCategoryComponent],
  imports: [
    CommonModule,
    ConfigrationRoutingModule,
    DataTableModule,
    FormsModule,
    HttpClientModule,
    NgbTypeaheadModule,
    NgbModalModule
  ],
  entryComponents: [],
  providers: [ProductCategoryService],
  exports: []
})
export class ConfigrationModule { }
