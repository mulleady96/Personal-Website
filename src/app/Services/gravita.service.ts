import { BehaviorSubject, Observable, Observer } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  getDoc,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";
// import "firebase/compat/database";
import { config } from "../credentials";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: "root",
})
export class GravitaService {
  // public enquiryListRef: firebase.default.database.Reference;
  app = initializeApp(config);

  db = getFirestore(this.app);
  AILimitRef = doc(this.db, "Limits", "sGNbtnG9rFj4mL2akP5O");
  AILimit;

  constructor(private http: HttpClient) {
    // const enquiryListRef = collection(db, "enquiry");
    // this.enquiryListRef = firebase.default.database().ref(`/enquiry/`);
  }

  createEnquiry(enquiryForm: []) {
    // console.log("log", enquiryForm);

    // db? means optional param, doesn't have to be supplied when being called by any other comp
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

        this.AILimit = data.AILimit;

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
    // console.log("limit", limit);
    // let bloggiID = localStorage.getItem("bloggiID"),
    //   id = "";
    // if (bloggiID) {
    //   id = bloggiID;
    // } else {
    //   id = uuidv4();
    // }
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

  /**
   *
   * @returns Bloggis Idea of the Day
   * Generate prompt can use createAIQuery for that & save response in firestore.
   */
  async saveIdea(query: string) {}

  async getAIQuery() {
    const collectionRef = collection(this.db, "generate");
    const q = query(
      collectionRef,
      where("id", "==", "bloggi"),
      orderBy("status.startTime")
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

  loginWithGoogle(): Promise<any> {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        return user;
        // return user;

        // return user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return error;
        // ...
      });
  }

  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  getImages() {
    return this.http.get("/assets/Images.json");
  }

  getVideos() {
    return this.http.get("/assets/Videos.json");
  }
}
