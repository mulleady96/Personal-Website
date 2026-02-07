import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from "firebase/firestore";

// import "firebase/compat/database";
import { config } from "../credentials";

@Injectable({
  providedIn: "root",
})
export class GravitaService {
  private http = inject(HttpClient);
  // public enquiryListRef: firebase.default.database.Reference;
  app = initializeApp(config);

  db = getFirestore(this.app);
  AILimitRef = doc(this.db, "Limits", "sGNbtnG9rFj4mL2akP5O");
  AILimit: number = 0;
  private aiQueryCache$: Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]> | null = null;  

  constructor() {
    // const enquiryListRef = collection(db, "enquiry");
    // this.enquiryListRef = firebase.default.database().ref(`/enquiry/`);
  }

  createEnquiry(enquiryForm: FormGroup) {
    addDoc(collection(this.db, "Enquiries"), {
      enquiry: enquiryForm,
    });
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
        // Invalidate cache so next fetch gets the new data
        this.aiQueryCache$ = null;
      });
    } catch (error) {
      console.log("Error generating prompt.", error);
    }
  }

  async getAIQuery() {
    if (this.aiQueryCache$) {
      return this.aiQueryCache$;
    }

    const collectionRef = collection(this.db, "blog");
    const q = query(
      collectionRef,
      where("id", "==", "bloggi"),
      orderBy("status.startTime"),
    );

    this.aiQueryCache$ = getDocs(q).then((snapshot) => snapshot.docs);
    return this.aiQueryCache$;
  }

  getImages() {
    return this.http.get("/assets/Images.json");
  }

  getVideos() {
    return this.http.get("/assets/Videos.json");
  }

  /* Admin / Rich Editor Methods */

  async getArticles() {
    const collectionRef = collection(this.db, "blog");
    // Get all bloggi posts, ordered by time. 
    // You might want to remove the 'where' clause if you want to see everything
    const q = query(
      collectionRef,
      where("id", "==", "bloggi"),
      orderBy("status.startTime", "desc") // Newest first
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      let startTime = data['status']?.startTime;
      if (startTime && typeof startTime.toDate === 'function') {
        startTime = startTime.toDate();
      }
      return { 
        docId: doc.id, 
        ...data,
        status: { ...data['status'], startTime } 
      };
    });
  }

  async getArticleById(id: string) {
    const docRef = doc(this.db, "blog", id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
       let startTime = data['status']?.startTime;
      if (startTime && typeof startTime.toDate === 'function') {
        startTime = startTime.toDate();
      }
      return { 
        docId: docSnap.id, 
        ...data,
        status: { ...data['status'], startTime } 
      };
    } else {
      return null;
    }
  }

  async updateArticle(id: string, data: any) {
    const docRef = doc(this.db, "blog", id);
    await updateDoc(docRef, data);
  }

  async createArticle(data: any) {
    // Ensure we set id: 'bloggi' so it shows up in the blog
    const docData = {
      ...data,
      id: "bloggi", 
      status: {
        startTime: new Date().toISOString(), // Use consistent timestamp format
        ...data.status
      }
    };
    await addDoc(collection(this.db, "blog"), docData);
  }

  async deleteArticle(id: string) {
     // Implement if needed, though user only asked for Add/Update
     // import { deleteDoc } from "firebase/firestore";
     // await deleteDoc(doc(this.db, "generate", id));
  }

}
