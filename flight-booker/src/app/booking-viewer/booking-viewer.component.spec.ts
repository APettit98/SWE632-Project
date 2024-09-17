import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingViewerComponent } from './booking-viewer.component';

describe('BookingViewerComponent', () => {
  let component: BookingViewerComponent;
  let fixture: ComponentFixture<BookingViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
