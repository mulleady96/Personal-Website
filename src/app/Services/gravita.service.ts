import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GravitaService {

  public enquiryListRef: firebase.database.Reference;

  constructor() {
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
}
