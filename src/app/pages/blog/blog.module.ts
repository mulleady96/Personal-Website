import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  }
];

@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogModule { }
