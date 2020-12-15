import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { TypeComponent } from './type/type.component';
import { SharedModule } from 'primeng/api';
import { OrderComponent } from './order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SanphamchayComponent } from './sanphamchay/sanphamchay.component';
import { SanphamchamComponent } from './sanphamcham/sanphamcham.component';


const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent
  },
  { path: 'category', component: TypeComponent },
  { path: 'order', component: OrderComponent},
  { path: 'sanphamchay', component: SanphamchayComponent},
  { path: 'sanphamcham', component: SanphamchamComponent}
];

@NgModule({
  declarations: [ProductComponent, TypeComponent, OrderComponent, SanphamchayComponent, SanphamchamComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FileUploadModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule


  ],

})
export class ProductModule { }
