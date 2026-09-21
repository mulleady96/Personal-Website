import { Functions } from '@angular/fire/functions';
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchButtonComponent } from "./search-button.component";

describe("SearchButtonComponent", () => {
  let component: SearchButtonComponent;
  let fixture: ComponentFixture<SearchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: Functions, useValue: {} }],
      imports: [SearchButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
