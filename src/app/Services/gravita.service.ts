import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

// import "firebase/compat/database";
import { config } from "../credentials";

@Injectable({
  providedIn: "root",
})
export class GravitaService {
  // public enquiryListRef: firebase.default.database.Reference;
  app = initializeApp(config);

  db = getFirestore(this.app);
  AILimitRef = doc(this.db, "Limits", "sGNbtnG9rFj4mL2akP5O");
  AILimit: number = 0;

  constructor(private http: HttpClient) {
    // const enquiryListRef = collection(db, "enquiry");
    // this.enquiryListRef = firebase.default.database().ref(`/enquiry/`);
  }

  createEnquiry(enquiryForm: FormGroup) {
    addDoc(collection(this.db, "Enquiries"), {
      enquiry: enquiryForm,
    });
    // return this.enquiryListRef.push({
    //   enquiry: enquiryForm,
    // });
  }

  async getLimit(documentId: string, createQuery: boolean) {
    try {
      // Reference the document by its ID
      const limitsDocRef = doc(this.db, "Limits", documentId);

      // Fetch the document
      const docSnap = await getDoc(limitsDocRef);

      if (docSnap.exists()) {
        // Document exists, you can access its data using docSnap.data()
        const data = docSnap.data();

        this.AILimit = data["AILimit"];

        if (createQuery) {
          updateDoc(this.AILimitRef, {
            AILimit: this.AILimit - 1,
          });
        }
        return data;
      } else {
        // Document does not exist
        console.log("Document does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  }

  async createAIQuery(sQuery: string) {
    /** Add a new Firestore document - Limit to 100 queries per day.*/
    // let limit = this.getLimit("sGNbtnG9rFj4mL2akP5O");

    try {
      await addDoc(collection(this.db, "generate"), {
        id: "bloggi",
        prompt: sQuery,
      }).then(() => {
        this.getLimit("sGNbtnG9rFj4mL2akP5O", true);
      });
      // -1 from limit.
      // this.AILimit = this.getLimit("sGNbtnG9rFj4mL2akP5O");
      // updateDoc(this.AILimitRef, {
      //   AILimit: this.AILimit--,
      // });
    } catch (error) {
      console.log("Error generating prompt.", error);
    }
  }

  async getAIQuery() {
    const collectionRef = collection(this.db, "generate");
    const q = query(
      collectionRef,
      where("id", "==", "bloggi"),
      orderBy("status.startTime"),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs;

    /** Listen for any changes **/
    // onSnapshot(q, (snapshot) => {
    //   console.log("fire snapshot", snapshot.docs);

    //   snapshot.docs.forEach((change) => {
    //     /** Get prompt and response */
    //     const { comment, output, response, prompt, status } = change.data();

    //     const mergedData = {
    //       response: response,
    //       prompt: prompt,
    //       state: status.state,
    //       createTime: status.completeTime,
    //     };

    //     observer.next(mergedData);
    //   });
    // });
  }

  getImages() {
    return this.http.get("/assets/Images.json");
  }

  getVideos() {
    return this.http.get("/assets/Videos.json");
  }
}
