import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsModule } from 'src/app/Components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
];

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppMaterialModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
