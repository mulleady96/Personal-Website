import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material';

import * as firebase from 'firebase';

import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  task: AngularFireUploadTask; // Allows you to pause, resume an upload task.

  percentage: Observable<number>; // Progress bar

  snapshot: Observable<any>;

  fileRef: any;

  downloadURL: Observable<string>;

  isHovering: boolean; // State for dropzone CSS toggling.

  public pictureRef: firebase.database.Reference;


  constructor(private storage: AngularFireStorage, public snackBar: MatSnackBar) {
    this.pictureRef = firebase
    .database()
    .ref(`/Logos/`);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    // if (file.type.split('/')[0] !== 'image') {
    //   this.snackBar.open('This file type is not supported', 'Oh no!', {
    //     duration: 5000,
    //     verticalPosition: 'bottom'
    //   });
    //   console.error('unsupported file type :( ');
    //   return;
    // }

    // The storage path
    const path = `Logos/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file);

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
  }


  isActive(snapshot) { // Make cancel + Pause buttons active whilst upload in progress.
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  ngOnInit() {
  }

}
