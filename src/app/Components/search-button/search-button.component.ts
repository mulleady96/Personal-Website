import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { AppMaterialModule } from "src/app/app-material.module";

@Component({
  selector: "app-search-button",
  standalone: true,
  imports: [NgIf, MatIcon, AppMaterialModule],
  template: `
    <button mat-fab color="accent" (click)="expand()" aria-label="Search">
      <mat-icon *ngIf="!search"> search </mat-icon>
      <mat-icon *ngIf="search" class="redIcon"> close </mat-icon>
    </button>
  `,
})
export class SearchButtonComponent {
  search: boolean = false;
  @Output() searchChange = new EventEmitter<boolean>();

  expand() {
    this.search = !this.search;
    this.searchChange.emit(this.search);
  }
}
