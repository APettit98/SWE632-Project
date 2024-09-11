import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent {

  constructor(private appService:AppService) {
  }

  ngOnInit(): void {

  }

  updateSearch() {
    const exampleSearch = {
      origin: "New York",
      destination: "Los Angeles",
      departureDate: "2024-12-01"
    }
    this.appService.setSearch(exampleSearch);
  }

}
