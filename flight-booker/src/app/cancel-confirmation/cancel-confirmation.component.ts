import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Booking } from '../booking';

@Component({
  selector: 'app-cancel-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './cancel-confirmation.component.html',
  styleUrl: './cancel-confirmation.component.css'
})
export class CancelConfirmationComponent {
  booking: Booking = {flightId: "", firstName: "", lastName: "", email: "", bookingCode: "", fareClass: ""};
  flightData: any = {};

  constructor(private appService: AppService) {
    this.appService.getBooking.subscribe(b => this.booking = b);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
  }

  ngOnInit(): void {
    
  }
}
