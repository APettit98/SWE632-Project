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
import { FlightSearchHistoryComponent } from "../flight-search-history/flight-search-history.component";
import { SavedFlightsComponent } from "../saved-flights/saved-flights.component";
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { NgFor } from '@angular/common';
import { ComponentCanDeactivate } from '../guard.service';
import { HostListener } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [MatStepperModule, BookingConfirmationComponent, FlightSearchComponent, FlightSelectorComponent, FlightReservationComponent, MatButtonModule, FormsModule, MatIconModule, FlightSearchHistoryComponent, SavedFlightsComponent, MatListModule, DatePipe, NgFor],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements ComponentCanDeactivate {
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.hasUnsavedProgress;
  }

  @ViewChild(FlightSearchComponent) flightSearchComponent: FlightSearchComponent;
  @ViewChild(FlightSelectorComponent) flightSelectorComponent: FlightSelectorComponent;
  @ViewChild(FlightReservationComponent) flightReservationComponent: FlightReservationComponent;
  @ViewChild(BookingConfirmationComponent) bookingConfirmationComponent: BookingConfirmationComponent;

  maxStepReached: number = 0;
  selectedIndex: number = 0;

  disableSearchButton: boolean = true;
  flightSelected: boolean = false;
  disableReservationButton: boolean = true;
  hasUnsavedProgress = false;

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
    this.hasUnsavedProgress = false;

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
    this.hasUnsavedProgress = false;
  }

  searchFlights() {
    this.flightSearchComponent.updateSearch();
    this.completeStep(1);
    setTimeout(() => {
      this.flightSelectorComponent.ngOnInit()
    }, 500);
  }

  loadSearch(search: any) {
    this.appService.setSearch(JSON.parse(JSON.stringify(search)));
    this.completeStep(1);
    setTimeout(() => {
      this.flightSelectorComponent.ngOnInit()
    }, 500);
  }

  completeReservation() {
    this.flightReservationComponent.createBooking();
    this.bookingConfirmationComponent.ngOnInit();
    this.completeStep(3);
    this.hasUnsavedProgress = false;
  }


  completeSearchStep(complete: any) {
    if (complete) {
      this.searchFlights();
    }
  }

  flightSelectedEvent(flightSelected: any) {
    this.flightSelected = flightSelected;
    this.completeStep(2);
    this.flightReservationComponent.ngOnInit();
    this.hasUnsavedProgress = true;
  }

  reservationFormStatusChange(isValid: any) {
    this.disableReservationButton = !isValid;
  }

}
