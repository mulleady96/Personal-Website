/* eslint-disable @typescript-eslint/no-unused-vars */
import "hammerjs";

import {
  enableProdMode,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { bootstrapApplication, HAMMER_GESTURE_CONFIG, HammerModule } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { getFunctions, provideFunctions } from "@angular/fire/functions";

import { AppComponent } from "./app/app.component";
import { routes } from "./app/app-routing.module";
import { environment } from "./environments/environment";
import { config } from "./app/credentials";
import { HammerConfig } from "./app/Hammerjs";
import { ThemeService } from "./app/Services/theme.service";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: "enabled" })),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      AngularFireModule.initializeApp(config),
      AngularFireStorageModule,
      HammerModule,
      ServiceWorkerModule.register("ngsw-worker.js", {
        enabled: environment.production,
      })
    ),
    ThemeService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    },
    provideFirebaseApp(() => initializeApp(config)),
    provideFunctions(() => getFunctions()),
  ],
}).catch((err) => console.error(err));
