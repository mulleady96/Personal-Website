/* eslint-disable @typescript-eslint/no-unused-vars */


import {
  enableProdMode,
  importProvidersFrom,
  provideZonelessChangeDetection,
} from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getFunctions, provideFunctions } from "@angular/fire/functions";
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { environment } from "./environments/environment";
import { config } from "./app/credentials";
import { ThemeService } from "./app/Services/theme.service";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: "enabled" })),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(

      ServiceWorkerModule.register("ngsw-worker.js", {
        enabled: environment.production,
      })
    ),
    ThemeService,

    provideFirebaseApp(() => initializeApp(config)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideAnalytics(() => getAnalytics()),
    provideStorage(() => getStorage()),
    ScreenTrackingService,
    UserTrackingService,
  ],
}).catch((err) => console.error(err));
