import { TestBed, inject } from '@angular/core/testing';

import { GravitaService } from './gravita.service';

describe('GravitaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GravitaService]
    });
  });

  it('should be created', inject([GravitaService], (service: GravitaService) => {
    expect(service).toBeTruthy();
  }));
});
