import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class GravitaService {

  public enquiryListRef: firebase.database.Reference;

  constructor(private http: HttpClient) {
    this.enquiryListRef = firebase
    .database()
    .ref(`/enquiry/`);
   }

  createEnquiry(firstName: string, lastName: string, email: string, phoneNo: string,
     companyName: string, address: string, description: string, angularChecked: boolean,
   ionicChecked: boolean): firebase.database.ThenableReference {

    return this.enquiryListRef.push({
      firstName:  firstName,
      lastName: lastName,
      email:  email,
      phoneNo: phoneNo,
      companyName: companyName,
      address: address,
      description: description,
      angularChecked: angularChecked,
      ionicChecked: ionicChecked
    });

  }

  getImages(){
    return this.http.get('/assets/Images.json');
  }

  getVideos(){
    return this.http.get('/assets/Videos.json');
  }
}
