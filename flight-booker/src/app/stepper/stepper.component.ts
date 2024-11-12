import { Component, ViewChild } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { BookingConfirmationComponent } from '../booking-confirmation/booking-confirmation.component';
import { FlightSearchComponent } from '../flight-search/flight-search.component';
import { FlightSelectorComponent } from '../flight-selector/flight-selector.component';
import { FlightReservationComponent } from '../flight-reservation/flight-reservation.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [MatStepperModule, BookingConfirmationComponent, FlightSearchComponent, FlightSelectorComponent, FlightReservationComponent, MatButtonModule, FormsModule, MatIconModule],
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
  disableReservationButton: boolean = true;

  constructor(private appService: AppService) {
    
  }

  ngOnInit(): void {
    this.appService.getResetStepper.subscribe((reset: boolean) => {
      if (reset) {
        this.returnToStart()
        this.appService.setResetStepper(false);
      }
    });
  }

  returnToStart() {
    this.selectedIndex = 0;
    this.maxStepReached = 0;
    this.disableSearchButton = true;
    this.flightSelected = false;
    this.disableReservationButton = true;

    this.appService.setBooking({flightId: "", firstName: "", lastName: "", date: new Date(), email: "", bookingCode: "", fareClass: ""});
    this.appService.setSearch({origin: {name: "", state: "", stateCode: "", lat: 0, lon: 0}, destination: {name: "", state: "", stateCode: "", lat: 0, lon: 0}, departureDate: new Date()});
    this.appService.setFilter({filterEconomy: true, filterBusiness: true, filterFirst: true, maxPrice: 2000, selectedAirlines: ["American", "Delta", "United"]});
    this.flightSearchComponent.ngOnInit();
  }

  completeStep(stepIndex: number) {
    if (stepIndex > this.maxStepReached) {
      this.maxStepReached = stepIndex
    }
    this.selectedIndex= stepIndex;
  }

  backToSelect() {
    this.selectedIndex = 1;
    this.maxStepReached = 1;
    this.appService.setBooking({flightId: "", firstName: "", lastName: "", date: new Date(), email: "", bookingCode: "", fareClass: ""});
    this.disableReservationButton = true;
  }

  searchFlights() {
    this.flightSearchComponent.updateSearch();
    this.completeStep(1);
    setTimeout(() => {
      this.flightSelectorComponent.ngOnInit()
    }, 500);
  }

  completeReservation() {
    this.flightReservationComponent.createBooking();
    this.bookingConfirmationComponent.ngOnInit();
    this.completeStep(3);
  }


  searchFormStatusChange(isValid: any) {
    this.disableSearchButton = !isValid;
  }

  flightSelectedEvent(flightSelected: any) {
    this.flightSelected = flightSelected;
    this.completeStep(2);
    this.flightReservationComponent.ngOnInit();
  }

  reservationFormStatusChange(isValid: any) {
    this.disableReservationButton = !isValid;
  }

}
