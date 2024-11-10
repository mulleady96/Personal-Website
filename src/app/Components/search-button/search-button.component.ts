import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-search-button',
  standalone: false,
  imports: [NgIf, MatIcon],
  templateUrl: './search-button.component.html',
  styleUrl: './search-button.component.css'
})
export class SearchButtonComponent {
  search: boolean = false;
  @Input() searchFilters: any[] = [];
  @Output() searchChange = new EventEmitter<boolean>();

  searchFilter() {
    console.log(this.searchFilters);
    
  }

  expand() {
    this.search = !this.search;
    this.searchChange.emit(this.search)
    console.log(this.search);

  }
}
