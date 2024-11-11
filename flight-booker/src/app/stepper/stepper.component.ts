import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { BookingConfirmationComponent } from '../booking-confirmation/booking-confirmation.component';
import { FlightSearchComponent } from '../flight-search/flight-search.component';
import { FlightSelectorComponent } from '../flight-selector/flight-selector.component';
import { FlightReservationComponent } from '../flight-reservation/flight-reservation.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [MatStepperModule, BookingConfirmationComponent, FlightSearchComponent, FlightSelectorComponent, FlightReservationComponent, MatButtonModule, FormsModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  @ViewChild(FlightSearchComponent) flightSearchComponent: FlightSearchComponent;
  @ViewChild(FlightSelectorComponent) flightSelectorComponent: FlightSelectorComponent;
  @ViewChild(FlightReservationComponent) flightReservationComponent: FlightReservationComponent;
  @ViewChild(BookingConfirmationComponent) bookingConfirmationComponent: BookingConfirmationComponent;

  maxStepReached: number = 0;
  selectedIndex: number = 0;

  disableSearchButton: boolean = true;
  flightSelected: boolean = false;

  completeStep(stepIndex: number) {
    if (stepIndex > this.maxStepReached) {
      this.maxStepReached = stepIndex
      this.selectedIndex= stepIndex;
    }
  }

  searchFlights() {
    this.flightSearchComponent.updateSearch();
    this.completeStep(1);
    setTimeout(() => {
      this.flightSelectorComponent.ngOnInit()
    }, 500);
  }


  searchFormStatusChange(isValid: any) {
    this.disableSearchButton = !isValid;
  }

  flightSelectedEvent(flightSelected: any) {
    this.flightSelected = flightSelected;
    this.completeStep(2);
  }

}
