import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


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
    FlexLayoutModule,
    AppMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutModule { }
