import { Component } from '@angular/core';
import { Flight } from '../flight';
import { Booking } from '../booking';
import { AppService } from '../app.service';
import { MatButtonModule } from '@angular/material/button';
import * as utils from '../utils';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-booking-cancel',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIcon],
  templateUrl: './booking-cancel.component.html',
  styleUrl: './booking-cancel.component.css'
})
export class BookingCancelComponent {
  booking: Booking = {flightId: "", firstName: "", lastName: "", email: "", date: new Date(), bookingCode: "", fareClass: ""};
  flightData: any = {};
  bookedFlight: Flight = {id: "", date: "", origin: {"name": "", "state": "", "stateCode": "", lat: 0, lon: 0}, originCode: "", destination: {"name": "", "state": "", "stateCode": "", lat: 0, lon: 0}, destinationCode: "", departureTime: "", arrivalTime: "", duration: 0, airline: "", economyPrice: 0, businessPrice: 0, firstPrice: 0};
  farePaid: number = 0;
  dates: { [key: string]: string } = {}
  convertTime = utils.convertTime;

  constructor(private appService: AppService) {
    this.appService.getBooking.subscribe(b => this.booking = b);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
  }

  cancelBooking(): void {
    for (let i=0;i<this.flightData.bookings.length;i++) {
      if (this.flightData.bookings[i].bookingCode == this.booking.bookingCode) {
        this.flightData.bookings.splice(i,1)
      }
    }
    this.appService.setFlightData(this.flightData);
  }

  ngOnInit(): void {
    let date = new Date()
    for (let i=0;i<7;i++) {
      this.dates[date.toLocaleDateString('en-us', {weekday: 'long'})] = date.toLocaleDateString('en-us', {weekday: "short", month: "numeric", day: "numeric"})
      date.setDate(date.getDate() + 1);
    }
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
  }
}
