import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { FlightSearch } from "../flightSearch";


@Component({
  selector: 'app-flight-selector',
  standalone: true,
  imports: [],
  templateUrl: './flight-selector.component.html',
  styleUrl: './flight-selector.component.css'
})
export class FlightSelectorComponent {

  search: FlightSearch = {origin: "", destination: "", departureDate: ""};
  constructor(private appService:AppService) {
    this.appService.getSearch.subscribe(s => this.search = s);
  }

  ngOnInit(): void {
  }


}
