import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgProgressModule } from '@ngx-progressbar/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { config } from './credentials';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { GetInTouchComponent } from './pages/get-in-touch/get-in-touch.component';
import { DropZoneDirective } from './drop-zone.directive';

import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { FileSizePipe } from './pages/file-upload/file-size.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    AboutComponent,
    GetInTouchComponent,
    DropZoneDirective,
    FileSizePipe,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(config),
    AngularFireStorageModule,
    FormsModule,
    PdfViewerModule,
    NgProgressModule,
    MatInputModule,
    MatGridListModule,
    MatToolbarModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
