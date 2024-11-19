import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import * as utils from '../utils';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-saved-flights',
  standalone: true,
  imports: [MatGridListModule, MatExpansionModule, MatCardModule, NgFor, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './saved-flights.component.html',
  styleUrl: './saved-flights.component.css'
})
export class SavedFlightsComponent {
  flightData: any = {};
  convertTime = utils.convertTime;
  convertDuration = utils.convertDuration;

  constructor(private appService:AppService) {
    this.appService.getFlightData.subscribe(d => this.flightData = d);
  }

  @Output() reserveEvent = new EventEmitter<any>();

  reserveFlight(id: string, fareClass: string, date: Date) {
    this.appService.setBooking({
      flightId: id, 
      firstName: "", 
      lastName: "", 
      date: date,
      email: "", 
      bookingCode: "", 
      fareClass: fareClass
    });
    this.reserveEvent.emit(true);
  }


}
