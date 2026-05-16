import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatStepperModule } from "@angular/material/stepper";
import { RouterModule, Routes } from "@angular/router";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GetInTouchComponent } from "./get-in-touch.component";
import { BubblesComponent } from "../../Components/bubbles/bubbles.component";

const routes: Routes = [
  {
    path: "",
    component: GetInTouchComponent,
  },
];

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule.forChild(routes),
        BubblesComponent,
        GetInTouchComponent,
    ],
    exports: [RouterModule],
})
export class GetInTouchModule {}
