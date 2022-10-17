import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
// import "firebase/compat/database";
import { firebaseConfig } from "../credentials";

@Injectable({
  providedIn: "root",
})
export class GravitaService {
  // public enquiryListRef: firebase.default.database.Reference;
  app = initializeApp(firebaseConfig);

  db = getFirestore(this.app);

  constructor(private http: HttpClient) {
    // const enquiryListRef = collection(db, "enquiry");
    // this.enquiryListRef = firebase.default.database().ref(`/enquiry/`);
  }

  createEnquiry(enquiryForm: []) {
    console.log("log", enquiryForm);

    // db? means optional param, doesn't have to be supplied when being called by any other comp
    addDoc(collection(this.db, "Enquiries"), {
      enquiry: enquiryForm,
    });
    // return this.enquiryListRef.push({
    //   enquiry: enquiryForm,
    // });
  }

  getImages() {
    return this.http.get("/assets/Images.json");
  }

  getVideos() {
    return this.http.get("/assets/Videos.json");
  }
}
