import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private router: Router) { }

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  search: boolean;

  time: number;
  postedAgo: String;

  ngOnInit() {
    this.postTimeAgo();
  }

  expand() {
    this.search = !this.search;
  }

  applySearch(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
  }

  clearSearch(filterValue) {
    filterValue = '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateDetail() {
    this.router.navigate['/BlogDetail'];
  }

  clearInput(filterValue: string) {
    this.dataSource = this.dataSource;
  }

  postTimeAgo() {
    this.postedAgo = moment([2019, 3, 14]).fromNow();
    return this.postedAgo;
  }

}
