import {  Component, EventEmitter, model, Output } from '@angular/core';
import { AppService } from '../app.service';
import { FlightSearch } from "../flightSearch";
import { Flight } from '../flight';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Booking } from '../booking';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import * as utils from '../utils';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-flight-selector',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule, MatGridListModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatSliderModule, FormsModule, ReactiveFormsModule, MatExpansionModule, MatCheckboxModule, NgFor, NgIf, RouterLink, MatProgressSpinnerModule],
  templateUrl: './flight-selector.component.html',
  styleUrl: './flight-selector.component.css',
})
export class FlightSelectorComponent {

  search: FlightSearch = {origin: {"name": "", "state": "", "stateCode": "", lat: 0, lon: 0}, destination: {"name": "", "state": "", "stateCode": "", lat: 0, lon: 0}, departureDate: new Date()};
  booking: Booking = {flightId: "", firstName: "", lastName: "", email: "", date: new Date(), bookingCode: "", fareClass: ""};
  flightData: any = {};
  loading = false;
  availableFlights: Flight[] = [];
  availableAirlines: string[] = [];
  maxPrice: number = 2000;
  selectedMaxPrice: number = 0;
  priceSliderChanged = false;
  filter: any = {};
  sortOption: any = {};
  searchDateString: string = "";
  readonly filterEconomy = model(true);
  readonly filterBusiness = model(true);
  readonly filterFirst = model(true);
  convertTime = utils.convertTime;
  convertDuration = utils.convertDuration;

  @Output() flightSelected = new EventEmitter<boolean>();

  constructor(private appService:AppService) {
    this.getData();
  }

  getData() {
    this.appService.getSearch.subscribe(s => this.search = s);
    this.appService.getBooking.subscribe(b => this.booking = b);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
    this.appService.getFilter.subscribe(f => this.filter = f);
    this.appService.getSortOption.subscribe(s => this.sortOption = s);
    this.searchDateString = this.search.departureDate.toLocaleDateString('en-us', {month: 'short', day: 'numeric', year: 'numeric'});
  }



 selectFlight(id: string, fareClass: string){
    this.appService.setBooking({
      flightId: id, 
      firstName: "", 
      lastName: "", 
      date: this.search.departureDate,
      email: "", 
      bookingCode: "", 
      fareClass: fareClass
    });
    this.flightSelected.emit(true);
  }

  initialFilter(): Flight[] {
    const dayOfWeek = new Date(this.search.departureDate + '/' + (new Date().toLocaleDateString('en-us', {year: "numeric"}))).toLocaleString('en-us', {weekday: 'long'});
    return this.flightData.flights.filter((flight: Flight) => {
      if (flight.origin.name !== this.search.origin.name) {
        return false;
      }
      if (flight.destination.name !== this.search.destination.name) {
        return false;
      }
      if (flight.date !== dayOfWeek) {
        return false;
      }
      else {
        return true;
      }
    });
  }

  getPriceRange(): number[] {
    const prices: number[] = [];
    if (this.availableFlights.length) {
      this.availableFlights.forEach(flight => {
        if (this.filterEconomy()) prices.push(flight.economyPrice);
        if (this.filterBusiness()) prices.push(flight.businessPrice);
        if (this.filterFirst()) prices.push(flight.firstPrice);
      });
      return [Math.min(...prices), Math.max(...prices)];
    } else {
      return [0, 2000];
    }
    
  }

  ngOnInit(): void {
    this.getData();
    this.availableFlights = this.initialFilter();
    this.availableAirlines = this.availableFlights.map(flight => flight.airline);
    const priceRange = this.getPriceRange();
    this.maxPrice = priceRange[1];
    this.selectedMaxPrice = this.maxPrice;
    this.filterByAirline();
    this.sortFlights();
  }

  onFareClassFilterChange(): void {
    const priceRange = this.getPriceRange();
    this.maxPrice = priceRange[1];
    if (this.selectedMaxPrice > this.maxPrice || !this.priceSliderChanged) {
      this.selectedMaxPrice = this.maxPrice;
    }
  }

  filterByAirline() {
    const selectedAirlines: string[] = this.filter.selectedAirlines ? this.filter.selectedAirlines : [];

    this.availableFlights = this.initialFilter().filter((flight) => {
      if (selectedAirlines?.includes(flight.airline)) {
        return true;
      }
      else {
        return false;
      }
    });
    const priceRange = this.getPriceRange();
    this.maxPrice = priceRange[1];
    if (this.selectedMaxPrice > this.maxPrice || !this.priceSliderChanged) {
      this.selectedMaxPrice = this.maxPrice;
    }
    this.sortFlights();
  }

  filterByPrice() {
    this.priceSliderChanged = true;
    this.filterByAirline();
    this.availableFlights = this.availableFlights.filter((flight) => {
      if ((this.filterEconomy() && flight.economyPrice <= this.selectedMaxPrice) ||
          (this.filterBusiness() && flight.businessPrice <= this.selectedMaxPrice) ||
          (this.filterFirst() && flight.firstPrice <= this.selectedMaxPrice)) {
        return true;
      }
      else {
        return false;
      }
    });
  }

  getDisplayPrice(flight: Flight): string {
    if (this.filterEconomy()) {
      return flight.economyPrice.toString() + " (Economy)";
    } else if (this.filterBusiness()) {
      return flight.businessPrice.toString() + " (Business)";
    } else if (this.filterFirst()) {
      return flight.firstPrice.toString() + " (First)";
    } else {
      return flight.economyPrice.toString() + " (Economy)"; 
    }
  
  }

  sortFlights() {
    this.loading = true;
    setTimeout(() => 
      {
        switch (this.sortOption) {
          case "price": 
            this.availableFlights.sort(this.sortByPrice);
            this.loading = false;
            break;
          case "duration":
            this.availableFlights.sort(this.sortByDuration);
            this.loading = false;
            break;
          case "departureTime":
            this.availableFlights.sort(this.sortByDepartureTime);
            this.loading = false
            break;
        }
      },
      250);
  } 

  sortByPrice(a: Flight, b: Flight): number {
    if (a.economyPrice < b.economyPrice) {
      return -1;
    } else if (a.economyPrice > b.economyPrice) {
      return 1;
    }
    return 0;
  }

  sortByDuration(a: Flight, b: Flight): number {
    if (a.duration < b.duration) {
      return -1;
    } else if (a.duration > b.duration) {
      return 1;
    }
    return 0;
  }

  sortByDepartureTime(a: Flight, b: Flight): number {
    if (a.departureTime < b.departureTime) {
      return -1;
    } else if (a.departureTime > b.departureTime) {
      return 1;
    }
    return 0;
  }

}
