import { ComponentsModule } from './Components/components.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgProgressModule } from '@ngx-progressbar/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { config } from './credentials';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ThemeService } from './Services/theme.service';
import { AppMaterialModule } from './app-material.module';
import { HammerConfig } from './Hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(config),
    AngularFireStorageModule,
    PdfViewerModule,
    ComponentsModule,
    NgProgressModule,
    AppMaterialModule,
    HammerModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ThemeService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
