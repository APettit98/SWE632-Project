import { Component, EventEmitter, Output } from '@angular/core';
import { Booking } from '../booking';
import { AppService } from '../app.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Flight } from '../flight';
import * as utils from '../utils';
import { MatCardModule } from '@angular/material/card';
import { ShowOnDirtyOrTouchedErrorStateMatcher } from '../showOnDirtyOrTouchedErrorStateMatcher';

@Component({
  selector: 'app-flight-reservation',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, RouterLink, MatGridListModule, MatCardModule],
  templateUrl: './flight-reservation.component.html',
  styleUrl: './flight-reservation.component.css'
})
export class FlightReservationComponent {
  booking: Booking = {flightId: "", firstName: "", lastName: "", date: new Date(), email: "", bookingCode: "", fareClass: ""};
  flightData: any = {};
  flightPrice: number = 0;
  dateString: string = "";
  bookedFlight: Flight = {id: "", date: "", origin: {"name": "", "state": "", "stateCode": "", lat: 0, lon: 0}, originCode: "", destination: {"name": "", "state": "", "stateCode": "", lat: 0, lon: 0}, destinationCode: "", departureTime: "", arrivalTime: "", duration: 0, airline: "", economyPrice: 0, businessPrice: 0, firstPrice: 0};
  readonly firstName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z -\']*')]);
  readonly lastName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z -\']*')]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  convertTime = utils.convertTime;
  errorStateMatcher = new ShowOnDirtyOrTouchedErrorStateMatcher();

  @Output() formIsValid = new EventEmitter<boolean>();

  constructor(private appService: AppService) {
    this.appService.getBooking.subscribe(b => this.booking = b);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
    this.firstName.statusChanges.subscribe(() => {
      this.formIsValid.emit(this.firstName.valid && this.lastName.valid && this.email.valid);
    });
    this.lastName.statusChanges.subscribe(() => {
      this.formIsValid.emit(this.firstName.valid && this.lastName.valid && this.email.valid);
    });
    this.email.statusChanges.subscribe(() => {
      this.formIsValid.emit(this.firstName.valid && this.lastName.valid && this.email.valid);
    });
  }

  ngOnInit(): void {
    this.bookedFlight = this.flightData.flights.find((f: any) => f.id === this.booking.flightId);
    if (this.bookedFlight === undefined) {
      this.bookedFlight = {id: "", date: "", origin: {"name": "", "state": "", "stateCode": "", lat: 0, lon: 0}, originCode: "", destination: {"name": "", "state": "", "stateCode": "", lat: 0, lon: 0}, destinationCode: "", departureTime: "", arrivalTime: "", duration: 0, airline: "", economyPrice: 0, businessPrice: 0, firstPrice: 0};
    }
    switch (this.booking.fareClass) {
      case "Economy":
        this.flightPrice = this.bookedFlight.economyPrice;
        break;
      case "Business":
        this.flightPrice = this.bookedFlight.businessPrice;
        break;
      case "First":
        this.flightPrice = this.bookedFlight.firstPrice;
        break;
      default:
        this.flightPrice = 0;
    }
    this.dateString = this.booking.date.toLocaleDateString('en-us', {month: 'short', day: 'numeric', year: 'numeric'});

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
      date: this.booking.date,
      email: this.email.value !== null ? this.email.value : "",
      bookingCode: this.generateBookingCode(),
      fareClass: this.booking.fareClass
    });
    this.flightData.bookings.push(this.booking);
    this.appService.setFlightData(this.flightData);
  }

}
