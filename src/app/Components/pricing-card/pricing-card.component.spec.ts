import { Functions } from '@angular/fire/functions';
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PricingCardComponent } from "./pricing-card.component";

describe("PricingCardComponent", () => {
  let component: PricingCardComponent;
  let fixture: ComponentFixture<PricingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: Functions, useValue: {} }],
      imports: [PricingCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PricingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
