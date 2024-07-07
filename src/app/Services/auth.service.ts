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
} from "firebase/firestore";
// import "firebase/compat/database";
import { config } from "../credentials";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  app = initializeApp(config);

  db = getFirestore(this.app);

  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this.dataSubject.asObservable();
  constructor() {}

  getCurrentUser(): Promise<User | null> {
    const auth = getAuth();

    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe(); // Unsubscribe immediately after receiving the first user state

          if (user) {
            // User is signed in
            this.dataSubject.next(user);
            resolve(user); // Resolve with the user object
          } else {
            // User is signed out
            resolve(null); // Resolve with null if user is signed out
          }
        },
        reject
      ); // Reject if there's an error
    });
    // const auth = getAuth();
    // const user = auth.currentUser;

    // if (user !== null) {
    //   // The user object has basic properties such as display name, email, etc.
    //   const displayName = user.displayName;
    //   const email = user.email;
    //   const photoURL = user.photoURL;
    //   const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    // const uid = user.uid;
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
}
