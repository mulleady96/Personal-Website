import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { Analytics } from "@angular/fire/analytics";
import { Functions } from "@angular/fire/functions";

import { PaymentSuccessComponent } from "./payment-success.component";

describe("PaymentSuccessComponent", () => {
  let component: PaymentSuccessComponent;
  let fixture: ComponentFixture<PaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSuccessComponent],
      providers: [
        provideRouter([]),
        { provide: Analytics, useValue: { app: { options: {} } } },
        { provide: Functions, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
