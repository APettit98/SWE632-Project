import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { FlightSearch } from "../flightSearch";
import * as flightData from '../flightData.json';
import { Flight } from '../flight';


@Component({
  selector: 'app-flight-selector',
  standalone: true,
  imports: [],
  templateUrl: './flight-selector.component.html',
  styleUrl: './flight-selector.component.css'
})
export class FlightSelectorComponent {

  search: FlightSearch = {origin: "", destination: "", departureDate: ""};
  availableFlights: Flight[] = [];
  constructor(private appService:AppService) {
    this.appService.getSearch.subscribe(s => this.search = s);
  }

  ngOnInit(): void {
    const flightOptions: Flight[] = flightData.flights;
    const dayOfWeek = new Date(this.search.departureDate).toLocaleString('en-us', {weekday: 'long'});
    this.availableFlights = flightOptions.filter((flight) => {
      if (flight.origin !== this.search.origin) {
        return false;
      }
      if (flight.destination !== this.search.destination) {
        return false;
      }
      if (flight.date !== dayOfWeek) {
        return false;
      }
      else {
        return true;
      }
    });
  }


}
