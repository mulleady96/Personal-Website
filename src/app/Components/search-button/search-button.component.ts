
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { AppMaterialModule } from "src/app/app-material.module";

@Component({
    selector: "app-search-button",
    imports: [MatIcon, AppMaterialModule],
    template: `
    <button mat-fab color="accent" (click)="expand()" aria-label="Search">
      @if (!search) {
        <mat-icon> search </mat-icon>
      }
      @if (search) {
        <mat-icon class="redIcon"> close </mat-icon>
      }
    </button>
    `
})
export class SearchButtonComponent {
  search: boolean = false;
  @Output() searchChange = new EventEmitter<boolean>();

  expand() {
    this.search = !this.search;
    this.searchChange.emit(this.search);
  }
}
