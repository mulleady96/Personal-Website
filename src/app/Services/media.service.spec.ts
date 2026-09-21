import { Functions } from '@angular/fire/functions';
import { TestBed } from "@angular/core/testing";

import { MediaService } from "./media.service";

describe("MediaService", () => {
  let service: MediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Functions, useValue: {} }],});
    service = TestBed.inject(MediaService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
