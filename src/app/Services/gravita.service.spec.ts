import { TestBed } from '@angular/core/testing';
import { GravitaService } from './gravita.service';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Functions } from '@angular/fire/functions';

describe('GravitaService', () => {
  let service: GravitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Firestore, useValue: {} },
        { provide: Storage, useValue: {} },
        { provide: Functions, useValue: {} }
      ]
    });
    service = TestBed.inject(GravitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
