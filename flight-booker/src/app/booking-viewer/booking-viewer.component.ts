import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { Booking } from '../booking';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-viewer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './booking-viewer.component.html',
  styleUrl: './booking-viewer.component.css'
})
export class BookingViewerComponent {
  booking: Booking = {flightId: "", firstName: "", lastName: "", email: "", date: new Date(), bookingCode: "", fareClass: ""};
  flightData: any = {}
  name: string = ''
  code: string = ''
  bookingList: Booking [] = []

  constructor(private appService:AppService) {
    this.appService.getBooking.subscribe(b => this.booking = b);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
  }

  isValid(): boolean {
    return this.bookingList.filter((booking: Booking) => this.name == booking.lastName && this.code == booking.bookingCode).length == 0
  }

  selectBooking(): void {
    let b = this.bookingList.filter((booking: Booking) => this.name == booking.lastName && this.code == booking.bookingCode)
    this.appService.setBooking(b[0]);
  }
  
  ngOnInit(): void {
    for (let b of this.flightData.bookings) {
      this.bookingList.push(b)
    }
  }
}
