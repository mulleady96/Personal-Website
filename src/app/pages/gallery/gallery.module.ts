import { ComponentsModule } from '../../Components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent
  }
];

@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    ComponentsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class GalleryModule { }
