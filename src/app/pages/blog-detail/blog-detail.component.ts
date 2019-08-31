import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  constructor(private location: Location) {
    const githubGist1 = '<script src="https://gist.github.com/mulleady96/3b16609626bbfde2aa25bff9363d4c82.js"></script>';
   }

  ngOnInit() {
    this.timePostedAgo();
  }

  goBack() {
    this.location.back();
  }

  timePostedAgo() { // Shows When it was posted.
    const yourDate = new Date();
    const postedAgo = moment(yourDate).fromNow();
    console.log(postedAgo);
  }

}
