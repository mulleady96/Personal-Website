// import { Component, OnInit } from "@angular/core";
// // import {
// //   AngularFireStorage,
// //   AngularFireUploadTask,
// // } from "@angular/fire/compat/storage";
// // import { Observable } from "rxjs";
// import { MatSnackBar } from "@angular/material/snack-bar";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "src/app/credentials";

// // import * as firebase from "firebase/compat/app";
// // import "firebase/compat/database";

// // import { tap, finalize } from "rxjs/operators";

// @Component({
//   selector: "app-file-upload",
//   templateUrl: "./file-upload.component.html",
//   styleUrls: ["./file-upload.component.scss"],
// })
// export class FileUploadComponent implements OnInit {
//   // task: AngularFireUploadTask; // Allows you to pause, resume an upload task.

//   // percentage: Observable<number>; // Progress bar

//   // snapshot: Observable<any>;

//   // fileRef: any;

//   // downloadURL: Observable<string>;

//   isHovering: boolean; // State for dropzone CSS toggling.

//   // public pictureRef: firebase.default.database.Reference;

// public pictureRef: firebase.default.database.Reference;

//   FBaseConnection = () => {
//     // Create a root reference
//     // this.pictureRef = firebase.default.database().ref(`/Logos/`);
//   };

//   // toggleHover(event: boolean) {
//   //   this.isHovering = event;
//   // }

//   startUpload(event: FileList) {
//     //   // The File object

//     const file = event.item(0);

//     // const storage = getStorage();

//     // Create the file metadata
//     /** @type {any} */
//     const metadata = {
//       contentType: "image/jpeg",
//     };

//     // Upload file and metadata to the object 'images/mountains.jpg'
//     const storageRef = ref(storage, `Logos/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file, metadata);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//         }
//       },
//       (error) => {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//           case "storage/unauthorized":
//             // User doesn't have permission to access the object
//             break;
//           case "storage/canceled":
//             // User canceled the upload
//             break;

//           // ...

//           case "storage/unknown":
//             // Unknown error occurred, inspect error.serverResponse
//             break;
//         }
//       },
//       () => {
//         // Upload completed successfully, now we can get the download URL
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log("File available at", downloadURL);
//         });
//       }
//     );

//     //   const storage = getStorage();
//     //   const storageRef = ref(storage, `/Logos/`);

//     //   const metadata = {
//     //     contentType: "image/jpeg",
//     //   };

//     //   // 'file' comes from the Blob or File API
//     //   // Client-side validation example - Only take in images/logos
//     //   // if (file.type.split("/")[0] !== "image") {
//     //   //   this.snackBar.open("This file type is not supported", "Oh no!", {
//     //   //     duration: 5000,
//     //   //     verticalPosition: "bottom",
//     //   //   });
//     //   //   // console.error('unsupported file type :( ');
//     //   //   return;
//     //   // }
//     //   uploadBytes(storageRef, file, metadata).then((snapshot) => {
//     //     console.log("Uploaded a blob or file!");
//     //   });

//     //   const uploadTask = uploadBytesResumable(storageRef, file);

//     //   // Listen for state changes, errors, and completion of the upload.
//     //   uploadTask.on(
//     //     "state_changed",
//     //     (snapshot) => {
//     //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     //       const progress =
//     //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     //       console.log("Upload is " + progress + "% done");
//     //       switch (snapshot.state) {
//     //         case "paused":
//     //           console.log("Upload is paused");
//     //           break;
//     //         case "running":
//     //           console.log("Upload is running");
//     //           break;
//     //       }
//     //     },
//     //     (error) => {
//     //       // A full list of error codes is available at
//     //       // https://firebase.google.com/docs/storage/web/handle-errors
//     //       switch (error.code) {
//     //         case "storage/unauthorized":
//     //           // User doesn't have permission to access the object
//     //           break;
//     //         case "storage/canceled":
//     //           // User canceled the upload
//     //           break;

//     //         // ...

//     //         case "storage/unknown":
//     //           // Unknown error occurred, inspect error.serverResponse
//     //           break;
//     //       }
//     //     },
//     //     () => {
//     //       // Upload completed successfully, now we can get the download URL
//     //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//     //         console.log("File available at", downloadURL);
//     //       });
//     //     }
//     //   );

//     //   // try {
//     //   //   // Client-side validation example - Only take in images/logos
//     //   //   if (file.type.split("/")[0] !== "image") {
//     //   //     this.snackBar.open("This file type is not supported", "Oh no!", {
//     //   //       duration: 5000,
//     //   //       verticalPosition: "bottom",
//     //   //     });
//     //   //     // console.error('unsupported file type :( ');
//     //   //     return;
//     //   //   }

//     //   // The storage path
//     //   // const path = `Logos/${new Date().getTime()}_${file.name}`;

//     //   // Totally optional metadata
//     //   // const customMetadata = { app: "My Image Uploader!" };

//     //   // The main task
//     //   // this.task = this.storage.upload(path, file);

//   // const fileRef = this.storage.ref(path);
//     //   // const fileRef = this.storage.ref(path);

//     //   // Progress monitoring
//     //   // this.percentage = this.task.percentageChanges();
//     //   // this.snapshot = this.task.snapshotChanges().pipe(
//     //   // The file's download URL
//     //   //     finalize(() => (this.downloadURL = fileRef.getDownloadURL())),
//     //   //     tap((snap) => {
//     //   //       // console.log(snap);
//     //   //       if (snap.bytesTransferred === snap.totalBytes) {
//     //   //         // Update DB on completion
//     //   //         this.pictureRef.push({ path, size: snap.totalBytes }); // Log the upload as an entry into the DB
//     //   //         this.snackBar.open(
//     //   //           `${file.name} Successfully uploaded, Thank You!`,
//     //   //           "Great",
//     //   //           {
//     //   //             duration: 5000,
//     //   //             verticalPosition: "top",
//     //   //           }
//     //   //         );
//     //   //       }
//     //   //     })
//     //   //   );
//     //   // } catch (error) {
//     //   //   this.snackBar.open(
//     //   //     "Could not complete this operation for the following reason: " + error,
//     //   //     "OK",
//     //   //     {
//     //   //       duration: 5000,
//     //   //       verticalPosition: "bottom",
//     //   //     }
//     //   //   );
//     //   / }
//   }

//   // isActive(snapshot) {
//   //   // Make cancel + Pause buttons active whilst upload in progress.
//   //   return (
//   //     snapshot.state === "running" &&
//   //     snapshot.bytesTransferred < snapshot.totalBytes
//   //   );
//   // }

//   ngOnInit() {}
// }
