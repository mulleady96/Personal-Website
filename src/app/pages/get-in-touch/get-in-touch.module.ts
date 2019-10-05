import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GetInTouchComponent } from './get-in-touch.component';
import { AppMaterialModule } from 'src/app/app-material.module';


const routes: Routes = [
  {
    path: '',
    component: GetInTouchComponent
  }
];

@NgModule({
  declarations: [GetInTouchComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GetInTouchModule { }
