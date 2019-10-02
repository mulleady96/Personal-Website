import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { AppMaterialModule } from 'src/app/app-material.module';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutModule { }
