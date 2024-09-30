import { Component } from '@angular/core';
import { Booking } from '../booking';
import { AppService } from '../app.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-flight-reservation',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatGridListModule, MatButtonModule, RouterLink],
  templateUrl: './flight-reservation.component.html',
  styleUrl: './flight-reservation.component.css'
})
export class FlightReservationComponent {

  booking: Booking = {flightId: "", firstName: "", lastName: "", email: "", bookingCode: "", fareClass: ""};
  flightData: any = {};
  readonly firstName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z -\']*')]);
  readonly lastName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z -\']*')]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private appService: AppService) {
    this.appService.getBooking.subscribe(b => this.booking = b);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
  }

  generateBookingCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const existingCodes : string[] = this.flightData.bookingCodes;
    if (existingCodes.includes(result)) {
      return this.generateBookingCode();
    }
    this.flightData.bookingCodes.push(result);
    return result;
  }

  createBooking() {
    this.appService.setBooking({
      flightId: this.booking.flightId,
      firstName: this.firstName.value !== null ? this.firstName.value : "",
      lastName: this.lastName.value !== null ? this.lastName.value : "",
      email: this.email.value !== null ? this.email.value : "",
      bookingCode: this.generateBookingCode(),
      fareClass: this.booking.fareClass
    });
    this.flightData.bookings.push(this.booking);
    this.appService.setFlightData(this.flightData);
  }

}
