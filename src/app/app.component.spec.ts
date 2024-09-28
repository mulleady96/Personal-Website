import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "src/environments/environment";

import { AppComponent } from "./app.component";
describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: "", component: AppComponent }]),
        ServiceWorkerModule.register("ngsw-worker.js", {
          enabled: environment.production,
        }),
      ],
    }).compileComponents();
  }));
  it("should create the app", waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Andrew Mulleady'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("Andrew Mulleady");
  }));
});
