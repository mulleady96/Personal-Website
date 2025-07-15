import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingDialogComponent } from './pricing-dialog.component';

describe('PricingDialogComponent', () => {
  let component: PricingDialogComponent;
  let fixture: ComponentFixture<PricingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
