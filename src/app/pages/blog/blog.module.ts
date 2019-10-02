import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    FlexLayoutModule,
    AppMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogModule { }
