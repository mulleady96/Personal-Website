import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "src/environments/environment";
import { AppComponent } from "./app.component";
import { Analytics } from '@angular/fire/analytics';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule,
        ServiceWorkerModule.register("ngsw-worker.js", {
          enabled: environment.production,
        })
      ],
      providers: [
        provideRouter([{ path: "", component: AppComponent }]),
        { provide: Analytics, useValue: { app: { options: {} } } }
      ]
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Andrew Mulleady'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("Andrew Mulleady");
  });
});
