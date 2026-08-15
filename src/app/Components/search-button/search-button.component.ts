
import { Component, output } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: "app-search-button",
    imports: [MatIcon, MatButtonModule],
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
  searchChange = output<boolean>();

  expand() {
    this.search = !this.search;
    this.searchChange.emit(this.search);
  }
}
