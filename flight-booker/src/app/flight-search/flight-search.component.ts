import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightSearch } from '../flightSearch';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [MatButtonModule, RouterLink, NgFor, CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent {

  flightData: any = {}
  dates: String [] = []
  originFormControl = new FormControl('', Validators.required);
  destinationFormControl = new FormControl('', Validators.required);
  dateFormControl = new FormControl('', Validators.required);

  search: FlightSearch = {origin: "", destination: "", departureDate: ""};

  constructor(private appService:AppService) {
    this.appService.getSearch.subscribe(s => this.search = s);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
  }

  ngOnInit(): void {
    this.appService.setSearch({origin: "", destination: "", departureDate: ""});
    let date = new Date();
    for (let i=0; i<7; i++) {
      this.dates.push(date.toLocaleString("en-US", {month: "numeric", day: "numeric"}));
      date.setDate(date.getDate() + 1);
    }
  }

  updateSearch() {
   this.appService.setSearch(this.search);
  }

}