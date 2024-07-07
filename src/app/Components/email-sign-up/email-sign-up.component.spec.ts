import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSignUpComponent } from './email-sign-up.component';

describe('EmailSignUpComponent', () => {
  let component: EmailSignUpComponent;
  let fixture: ComponentFixture<EmailSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
