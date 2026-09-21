import { Functions } from '@angular/fire/functions';
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BubblesComponent } from "./bubbles.component";

describe("BubblesComponent", () => {
  let component: BubblesComponent;
  let fixture: ComponentFixture<BubblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: Functions, useValue: {} }],
      imports: [BubblesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
