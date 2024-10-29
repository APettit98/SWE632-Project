import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotBookingComponent } from './forgot-booking.component';

describe('ForgotBookingComponent', () => {
  let component: ForgotBookingComponent;
  let fixture: ComponentFixture<ForgotBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
