import { AppMaterialModule } from './../../app-material.module';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInTouchComponent } from './get-in-touch.component';
import { AngularFireModule } from '@angular/fire';
import { config } from 'src/app/credentials';

describe('GetInTouchComponent', () => {
  let component: GetInTouchComponent;
  let fixture: ComponentFixture<GetInTouchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetInTouchComponent ],
      imports: [ AppMaterialModule, AngularFireModule.initializeApp(config)],
      providers: [ AngularFireModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInTouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
