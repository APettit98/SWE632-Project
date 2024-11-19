import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchHistoryComponent } from './flight-search-history.component';

describe('FlightSearchHistoryComponent', () => {
  let component: FlightSearchHistoryComponent;
  let fixture: ComponentFixture<FlightSearchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightSearchHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
