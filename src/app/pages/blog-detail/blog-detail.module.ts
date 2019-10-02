import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailComponent } from './blog-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes: Routes = [
  {
    path: '',
    component: BlogDetailComponent
  }
];


@NgModule({
  declarations: [BlogDetailComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AppMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogDetailModule { }
