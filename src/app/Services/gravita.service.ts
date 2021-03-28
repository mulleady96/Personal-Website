import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class GravitaService {
  public enquiryListRef: firebase.default.database.Reference;

  constructor(private http: HttpClient) {
    this.enquiryListRef = firebase.default.database().ref(`/enquiry/`);
  }

  createEnquiry(enquiryForm: []): firebase.default.database.ThenableReference {
    return this.enquiryListRef.push({
      enquiry: enquiryForm,
    });
  }

  getImages() {
    return this.http.get('/assets/Images.json');
  }

  getVideos() {
    return this.http.get('/assets/Videos.json');
  }
}
