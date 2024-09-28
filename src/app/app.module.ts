import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerModule,
} from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import {
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { AppMaterialModule } from "./app-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./Components/components.module";
import { config } from "./credentials";
import { HammerConfig } from "./Hammerjs";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { ThemeService } from "./Services/theme.service";
@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(config),
    AngularFireStorageModule,
    ComponentsModule,
    FontAwesomeModule,
    AppMaterialModule,
    HammerModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    ThemeService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faGithub);
    library.addIcons(faLinkedin);
    library.addIcons(faWhatsapp);
  }
}
