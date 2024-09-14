import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { FlightSearch } from "../flightSearch";
import { Flight } from '../flight';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgFor } from '@angular/common';
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


@Component({
  selector: 'app-flight-selector',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule, MatGridListModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatSliderModule, FormsModule, ReactiveFormsModule, MatExpansionModule, NgFor, RouterLink],
  templateUrl: './flight-selector.component.html',
  styleUrl: './flight-selector.component.css'
})
export class FlightSelectorComponent {

  search: FlightSearch = {origin: "", destination: "", departureDate: ""};
  booking: Booking = {flightId: "", firstName: "", lastName: "", email: "", bookingCode: "", fareClass: ""};
  flightData: any = {};
  availableFlights: Flight[] = [];
  availableAirlines: string[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedMinPrice: number = 0;
  selectedMaxPrice: number = 0;
  chosenAirlines = new FormControl([]);
  sortOption = new FormControl('');
  convertTime = utils.convertTime;
  convertDuration = utils.convertDuration;

  constructor(private appService:AppService) {
    this.appService.getSearch.subscribe(s => this.search = s);
    this.appService.getBooking.subscribe(b => this.booking = b);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
  }



 selectFlight(id: string, fareClass: string){
    this.appService.setBooking({
      flightId: id, 
      firstName: "", 
      lastName: "", 
      email: "", 
      bookingCode: "", 
      fareClass: fareClass
    });
  }

  initialFilter(): Flight[] {
    const dayOfWeek = new Date(this.search.departureDate).toLocaleString('en-us', {weekday: 'long'});
    return this.flightData.flights.filter((flight: Flight) => {
      if (flight.origin !== this.search.origin) {
        return false;
      }
      if (flight.destination !== this.search.destination) {
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
    this.availableFlights.forEach(flight => {
      prices.push(flight.economyPrice, flight.businessPrice, flight.firstPrice);
    });
    return [Math.min(...prices), Math.max(...prices)];
  }

  ngOnInit(): void {
    this.availableFlights = this.initialFilter();
    this.availableAirlines = this.availableFlights.map(flight => flight.airline);
    const priceRange = this.getPriceRange();
    this.minPrice = priceRange[0];
    this.maxPrice = priceRange[1];
    this.selectedMinPrice = this.minPrice;
    this.selectedMaxPrice = this.maxPrice;
  }

  filterByAirline() {
    const selectedAirlines: string[] = this.chosenAirlines.value ? this.chosenAirlines.value : [];
    if (selectedAirlines.length === 0) {
      this.availableFlights = this.initialFilter();
      return;
    }

    this.availableFlights = this.initialFilter().filter((flight) => {
      if (selectedAirlines?.includes(flight.airline)) {
        return true;
      }
      else {
        return false;
      }
    });
    const priceRange = this.getPriceRange();
    this.minPrice = priceRange[0];
    this.maxPrice = priceRange[1];
  }

  filterByPrice() {
    this.filterByAirline();
    this.availableFlights = this.availableFlights.filter((flight) => {
      if ((flight.economyPrice >= this.selectedMinPrice
            || flight.businessPrice >= this.selectedMinPrice
            || flight.firstPrice >= this.selectedMinPrice)
          && (flight.firstPrice <= this.selectedMaxPrice
            || flight.businessPrice <= this.selectedMaxPrice
            || flight.economyPrice <= this.selectedMaxPrice)) {
        return true;
      }
      else {
        return false;
      }
    });
  }

  sortFlights() {
    switch (this.sortOption.value) {
      case "price": 
        this.availableFlights.sort(this.sortByPrice);
        break;
      case "duration":
        this.availableFlights.sort(this.sortByDuration);
        break;
      case "departureTime":
        this.availableFlights.sort(this.sortByDepartureTime);
        break;
    }
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
