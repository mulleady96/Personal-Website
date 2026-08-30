import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@angular/fire/storage";
import {
  Firestore,
  DocumentData,
  QueryDocumentSnapshot,
} from "@angular/fire/firestore";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export interface Enquiry {
  firstStep: { name: string };
  secondStep: { email: string };
  thirdStep: { query: string };
}

export interface MediaItem {
  title: string;
  src: string;
  description: string;
  date: string;
  likes: number;
  type: "image" | "video";
}

@Injectable({
  providedIn: "root",
})
export class GravitaService {
  private http = inject(HttpClient);
  private storage = inject(Storage);
  db = inject(Firestore);
  AILimit: number = 0;
  private aiQueryCache$: Promise<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  > | null = null;
  private mediaCache: Promise<MediaItem[]> | null = null;

  createEnquiry(enquiryForm: Enquiry) {
    addDoc(collection(this.db, "Enquiries"), {
      enquiry: enquiryForm,
    });
  }

  async getEnquiries() {
    const collectionRef = collection(this.db, "Enquiries");
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
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
          updateDoc(limitsDocRef, {
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

  async getMediaFromFirestore(): Promise<MediaItem[]> {
    if (this.mediaCache) {
      return this.mediaCache;
    }

    this.mediaCache = (async () => {
      try {
        const collectionRef = collection(this.db, "media");
        const snapshot = await getDocs(collectionRef);
        const firestoreMedia = snapshot.docs.map(
          (doc) => doc.data() as MediaItem,
        );

        const defaultVideos: MediaItem[] = [
          {
            title: "Videos",
            src: "https://youtu.be/R8vrdU_dc38",
            description: "A placeholder for video content",
            date: "14th February 2026",
            likes: 0,
            type: "video",
          },
          {
            title: "Videos",
            src: "https://youtu.be/YSWjwPRRsEY",
            description: "A placeholder for video content",
            date: "14th February 2026",
            likes: 0,
            type: "video",
          },
          {
            title: "Videos",
            src: "https://youtu.be/eCE0Q9jw4W0",
            description: "A placeholder for video content",
            date: "14th February 2026",
            likes: 0,
            type: "video",
          },
          {
            title: "Videos",
            src: "https://youtu.be/RAo4rkuuHuM",
            description: "A placeholder for video content",
            date: "14th February 2026",
            likes: 0,
            type: "video",
          },
        ];

        return [...firestoreMedia, ...defaultVideos];
      } catch (err) {
        console.error("Error fetching media from Firestore:", err);
        this.mediaCache = null; // Invalidate cache on error
        return [];
      }
    })();

    return this.mediaCache;
  }

  async uploadMedia(file: File, metadata: Partial<MediaItem>) {
    try {
      // 1. Upload to Storage
      const storageRef = ref(this.storage, `media/${Date.now()}_${file.name}`);
      const metadataParams = {
        cacheControl: "public, max-age=31536000",
      };
      const uploadTask = await uploadBytesResumable(
        storageRef,
        file,
        metadataParams,
      );
      const downloadUrl = await getDownloadURL(uploadTask.ref);

      // 2. Save to Firestore
      const mediaDoc = {
        title: metadata.title || file.name,
        src: downloadUrl,
        description: metadata.description || "",
        date:
          metadata.date ||
          new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        likes: 0,
        type: file.type.startsWith("video/") ? "video" : "image",
      };

      await addDoc(collection(this.db, "media"), mediaDoc);
      this.mediaCache = null; // Invalidate cache so new media will be fetched next time
      return true;
    } catch (error) {
      console.error("Error uploading media:", error);
      throw error;
    }
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
      orderBy("status.startTime", "desc"), // Newest first
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      let startTime = data["status"]?.startTime;
      if (startTime && typeof startTime.toDate === "function") {
        startTime = startTime.toDate();
      }
      return {
        docId: doc.id,
        ...data,
        status: { ...data["status"], startTime },
      };
    });
  }

  async getArticleById(id: string) {
    const docRef = doc(this.db, "blog", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      let startTime = data["status"]?.startTime;
      if (startTime && typeof startTime.toDate === "function") {
        startTime = startTime.toDate();
      }
      return {
        docId: docSnap.id,
        ...data,
        status: { ...data["status"], startTime },
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
        ...data.status,
      },
    };
    await addDoc(collection(this.db, "blog"), docData);
  }

  async deleteArticle(id: string) {
    // Implement if needed, though user only asked for Add/Update
    // import { deleteDoc } from "firebase/firestore";
    // await deleteDoc(doc(this.db, "generate", id));
  }
}
