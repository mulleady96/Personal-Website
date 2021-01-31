import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }


  time: number;
  postedAgo: String;

  ngOnInit() {
    this.postTimeAgo();
  }

  navigateDetail() {
    this.router.navigate['/BlogDetail'];
  }

  postTimeAgo() {
    this.postedAgo = moment([2019, 3, 14]).fromNow();
    return this.postedAgo;
  }
}
