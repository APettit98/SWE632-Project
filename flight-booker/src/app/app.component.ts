import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AppService } from './app.service';
import { FlightSearch } from './flightSearch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  search: FlightSearch = {origin: "", destination: "", departureDate: ""};

  constructor(private appService:AppService, private router: Router) {
    this.appService.setSearch(this.search);
  }
}
