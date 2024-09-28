/* eslint-disable @typescript-eslint/no-unused-vars */
import "hammerjs";

import {
  ApplicationConfig,
  enableProdMode,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { provideRouter } from "@angular/router";

import { AppModule } from "./app/app.module";
import { routes } from "./app/app-routing.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}
const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
  ],
};

// only if AppComponent was standalone.
// bootstrapApplication(AppComponent, appConfig).catch((err) =>
//   console.error(err)
// );

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
