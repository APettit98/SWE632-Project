import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { Booking } from '../booking';
import { Flight } from '../flight';
import * as utils from '../utils';
import { MatCardHeader } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [MatButton, MatCard, RouterLink, MatCardHeader, MatCardContent, MatCardActions],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  booking: Booking = {flightId: "", firstName: "", lastName: "", email: "", date: new Date(), bookingCode: "", fareClass: ""};
  flightData: any = {}
  bookedFlight: Flight = {id: "", date: "", origin: {"name": "", "state": "", "stateCode": "", lat: 0, lon: 0}, originCode: "", destination: {"name": "", "state": "", "stateCode": "", lat: 0, lon: 0}, destinationCode: "", departureTime: "", arrivalTime: "", duration: 0, airline: "", economyPrice: 0, businessPrice: 0, firstPrice: 0};
  farePaid: number = 0
  dateString: string = ""
  convertTime = utils.convertTime

  constructor(private appService:AppService) {
    this.appService.getBooking.subscribe(b => this.booking = b);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
  }

  ngOnInit(): void {
    this.bookedFlight = this.flightData.flights.find((f: Flight) => f.id === this.booking.flightId) || this.bookedFlight;
    switch (this.booking.fareClass) {
      case "Economy":
        this.farePaid = this.bookedFlight.economyPrice;
        break;
      case "Business":
        this.farePaid = this.bookedFlight.businessPrice;
        break;
      case "First":
        this.farePaid = this.bookedFlight.firstPrice;
        break;
      default:
        this.farePaid = 0;
    }
    this.dateString = this.booking.date.toLocaleDateString('en-us', {month: 'short', day: 'numeric', year: 'numeric'});
  }

}
