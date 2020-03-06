import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

import { tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  task: AngularFireUploadTask; // Allows you to pause, resume an upload task.

  percentage: Observable<number>; // Progress bar

  snapshot: Observable<any>;

  fileRef: any;

  downloadURL: Observable<string>;

  public pictureRef: firebase.database.Reference;

  constructor(private snackBar: MatSnackBar, private storage: AngularFireStorage) {
    this.initializeFirebase();
   }

  initializeFirebase () {
    this.pictureRef = firebase
    .database()
    .ref(`/Logos/`);
    console.log('started');
  }

  upload(event: FileList) {
    console.log('started uploaded');
    // The File object
    const file = event.item(0);

    // Client-side validation example - Only take in images/logos
    if (file.type.split('/')[0] !== 'image') {
      this.snackBar.open('This file type is not supported', 'Oh no!', {
        duration: 5000,
        verticalPosition: 'bottom'
      });
      // console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `Logos/${new Date().getTime()}_${file.name}`;

    // Optional metadata
    const customMetadata = { app: 'My Image Uploader!' };

    // The main task - is undefined
    this.task = this.storage.upload(path, file);
    console.log(this.task);
    
    const fileRef = this.storage.ref(path);
    
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      // The file's download URL
       finalize(() => this.downloadURL = fileRef.getDownloadURL()),
      tap(snap => {
        console.log(snap);
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update DB on completion
          this.pictureRef.push(({ path, size: snap.totalBytes })); // Log the upload as an entry into the DB
          this.snackBar.open(`${file.name} Successfully uploaded, Thank You!`, 'Great', {
            duration: 5000,
            verticalPosition: 'top'
          });
        }
      })
    );
    // } catch (error) {
    //   console.log('error');
    // }
  }

  isActive(snapshot) { // Make cancel + Pause buttons active whilst upload in progress.
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
