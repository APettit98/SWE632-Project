import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { FlightSearch } from "../flightSearch";
import * as flightData from '../flightData.json';
import { Flight } from '../flight';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Booking } from '../booking';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-flight-selector',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule, MatGridListModule, MatIconModule, MatButtonModule, NgFor, RouterLink],
  templateUrl: './flight-selector.component.html',
  styleUrl: './flight-selector.component.css'
})
export class FlightSelectorComponent {

  search: FlightSearch = {origin: "", destination: "", departureDate: ""};
  booking: Booking = {flightId: "", firstName: "", lastName: "", email: "", bookingCode: "", fareClass: ""};
  availableFlights: Flight[] = [];
  constructor(private appService:AppService) {
    this.appService.getSearch.subscribe(s => this.search = s);
    this.appService.getBooking.subscribe(b => this.booking = b);
  }

  convertTime(time: string): string {
    const [hours, minutes] = time.split(":");
    const ampm = parseInt(hours) >= 12 ? 'pm' : 'am';
    const adjustedHours = parseInt(hours) % 12;
    return `${adjustedHours}:${minutes} ${ampm}`;
  }

  convertDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}hr ${minutes}m`;
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

    console.log("Booking: ", this.booking);
  }

  ngOnInit(): void {
    const flightOptions: Flight[] = flightData.flights;
    const dayOfWeek = new Date(this.search.departureDate).toLocaleString('en-us', {weekday: 'long'});
    this.availableFlights = flightOptions.filter((flight) => {
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


}
