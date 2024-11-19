import { Component, EventEmitter, Output } from '@angular/core';
import { AppService } from '../app.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FlightSearch } from '../flightSearch';
import { City } from '../city';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-flight-search-history',
  standalone: true,
  imports: [MatButtonModule, RouterLink, CommonModule, NgFor, MatListModule, MatIconModule, MatStepperModule],
  templateUrl: './flight-search-history.component.html',
  styleUrl: './flight-search-history.component.css'
})
export class FlightSearchHistoryComponent {
  flightData: any = {};
  emptyCity: City = {name: "", state: "", stateCode: "", lat: 0, lon: 0};
  search: FlightSearch = {origin: this.emptyCity , destination: this.emptyCity , departureDate: new Date()};

  constructor(private appService:AppService) {
    this.appService.getSearch.subscribe(s => this.search = s);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
  }

  @Output() loadEvent = new EventEmitter<any>();

  loadSearch(savedSearch: FlightSearch) {
    this.loadEvent.emit(savedSearch);
  }
}
