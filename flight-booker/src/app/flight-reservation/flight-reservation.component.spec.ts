import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightReservationComponent } from './flight-reservation.component';

describe('FlightReservationComponent', () => {
  let component: FlightReservationComponent;
  let fixture: ComponentFixture<FlightReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
