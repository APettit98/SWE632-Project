import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../booking';
import { Flight } from '../flight';
import { AppService } from '../app.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as utils from '../utils'

@Component({
  selector: 'app-forgot-booking',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIcon, MatSelect, MatOption],
  templateUrl: './forgot-booking.component.html',
  styleUrl: './forgot-booking.component.css'
})
export class ForgotBookingComponent {
  booking: Booking = {flightId: "", firstName: "", lastName: "", email: "", bookingCode: "", fareClass: ""};
  flightData: any = {}
  email: string = ''
  date: string = ''
  bookingList: Booking [] = []
  codesData: any = []
  b: Booking [] = []
  dates: String [] = [];
  dateVisible = false;
  codesVisible = false;
  convertTime = utils.convertTime

  constructor(private appService:AppService) {
    this.appService.getBooking.subscribe(b => this.booking = b);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
  }

  emailIsValid(): boolean {
    return this.bookingList.filter((booking: Booking) => this.email == booking.email).length != 0
  }

  showDate() {
    this.dateVisible = true;
    this.b = this.bookingList.filter((booking: Booking) => this.email == booking.email)
    for (let i=0; i<this.b.length; i++) {
      let fl = this.flightData.flights.find((f: Flight) => f.id === this.b[i].flightId);
      this.codesData[i] = {code:this.b[i].bookingCode, flight:fl}
    }
  }

  showCodes() {
    this.codesVisible = true;
    this.codesData = this.codesData.filter((data: any) => new Date(this.date + '/' + (new Date().toLocaleDateString('en-us', {year: "numeric"}))).toLocaleString('en-us', {weekday: 'long'}) == data.flight.date)
  }
  
  ngOnInit(): void {
    for (let b of this.flightData.bookings) {
      this.bookingList.push(b);
    }
    let date = new Date();
    for (let i=0; i<7; i++) {
      this.dates.push(date.toLocaleString("en-US", {month: "numeric", day: "numeric"}));
      date.setDate(date.getDate() + 1);
    }
  }
}
