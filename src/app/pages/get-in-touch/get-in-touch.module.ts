import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatStepperModule } from "@angular/material/stepper";
import { RouterModule,Routes } from "@angular/router";

import { AppMaterialModule } from "../../app-material.module";
import { GetInTouchComponent } from "./get-in-touch.component";

const routes: Routes = [
  {
    path: "",
    component: GetInTouchComponent,
  },
];

@NgModule({
  declarations: [GetInTouchComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    MatStepperModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class GetInTouchModule {}
