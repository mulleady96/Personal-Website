import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetInTouchComponent } from './get-in-touch.component';
import { provideRouter } from '@angular/router';
import { GravitaService } from '../../Services/gravita.service';
import { MockGravitaService } from '../../testing/mocks';

describe('GetInTouchComponent', () => {
  let component: GetInTouchComponent;
  let fixture: ComponentFixture<GetInTouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetInTouchComponent],
      providers: [
        provideRouter([]),
        { provide: GravitaService, useClass: MockGravitaService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInTouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
