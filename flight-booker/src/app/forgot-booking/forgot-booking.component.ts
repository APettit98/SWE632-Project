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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-forgot-booking',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIcon, MatSelect, MatOption, MatInputModule, MatDatepickerModule],
  templateUrl: './forgot-booking.component.html',
  styleUrl: './forgot-booking.component.css'
})
export class ForgotBookingComponent {
  flightData: any = {}
  email: string = ''
  date: Date;
  bookingList: any [] = []
  codesData: any = []
  b: Booking [] = []
  minDate: Date = new Date();
  dateVisible = false;
  codesVisible = false;
  convertTime = utils.convertTime
  dateToDayOfWeek = utils.dateToDayOfWeek

  constructor(private appService:AppService) {
    this.appService.getFlightData.subscribe(d => this.flightData = d);
    this.appService.getMindate.subscribe(d => this.minDate = d);
  }

  searchBookings() {
    this.codesVisible = true;
    this.codesData = this.bookingList.filter((data: any) => {
      return this.email == data.booking.email && this.dateToDayOfWeek(this.date) === data.flight.date;
    });
  }

  dateToString(date: Date) {
    return date.toLocaleDateString('en-us', {month: 'short', day: 'numeric', year: 'numeric'});
  }

  
  ngOnInit(): void {
    for (let b of this.flightData.bookings) {
      const flight = this.flightData.flights.find((f: Flight) => f.id === b.flightId);
      this.bookingList.push({booking: b, flight: flight});
    }
  }
}
