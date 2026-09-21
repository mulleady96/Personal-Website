import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GalleryComponent } from './gallery.component';
import { MediaListComponent } from '../../Components/media-list/media-list.component';
import { GravitaService } from '../../Services/gravita.service';
import { MockGravitaService, MockMatDialog } from '../../testing/mocks';
import { MatDialog } from '@angular/material/dialog';
import { Functions } from '@angular/fire/functions';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]),
        { provide: GravitaService, useClass: MockGravitaService },
        { provide: MatDialog, useClass: MockMatDialog },
        { provide: Functions, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
