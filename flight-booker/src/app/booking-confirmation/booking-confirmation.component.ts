import { Component } from '@angular/core';
import { Booking } from '../booking';
import { AppService } from '../app.service';
import { Flight } from '../flight';
import * as utils from '../utils';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [MatCardModule, RouterLink, MatButtonModule],
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.css'
})
export class BookingConfirmationComponent {
  booking: Booking = {flightId: "", firstName: "", lastName: "", email: "", bookingCode: "", fareClass: ""};
  flightData: any = {};
  bookedFlight: Flight = {id: "", date: "", origin: "", originCode: "", destination: "", destinationCode: "", departureTime: "", arrivalTime: "", duration: 0, airline: "", economyPrice: 0, businessPrice: 0, firstPrice: 0};
  farePaid: number = 0;
  convertTime = utils.convertTime;

  constructor(private appService: AppService) {
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
  }

  ngOnDestroy(): void {
    this.appService.setBooking({flightId: "", firstName: "", lastName: "", email: "", bookingCode: "", fareClass: ""});
  }

}
