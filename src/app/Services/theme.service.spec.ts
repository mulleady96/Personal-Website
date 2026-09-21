import { Functions } from '@angular/fire/functions';
import { TestBed } from "@angular/core/testing";

import { ThemeService } from "./theme.service";

describe("ThemeService", () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers: [{ provide: Functions, useValue: {} }],}));

  it("should be created", () => {
    const service: ThemeService = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
  });
});
