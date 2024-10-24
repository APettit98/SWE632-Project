import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppService } from '../app.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightSearch } from '../flightSearch';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [MatButtonModule, RouterLink, NgFor, CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSliderModule, MatCheckboxModule, MatGridListModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class FlightSearchComponent {

  flightData: any = {};
  dates: String [] = [];
  filter: any = {filterEconomy: true, filterBusiness: true, filterFirst: true, maxPrice: 2000, selectedAirlines: []};
  sortOption: any = {};
  originFormControl = new FormControl('', Validators.required);
  destinationFormControl = new FormControl('', Validators.required);
  dateFormControl = new FormControl('', Validators.required);

  search: FlightSearch = {origin: {name: "", state: "", stateCode: ""} , destination: {name: "", state: "", stateCode: ""} , departureDate: ""};

  constructor(private appService:AppService) {
    this.appService.getSearch.subscribe(s => this.search = s);
    this.appService.getFlightData.subscribe(d => this.flightData = d);
    this.appService.getFilter.subscribe(f => this.filter = f);
    this.appService.getSortOption.subscribe(s => this.sortOption = s);
  }

  onSelect(): void {
    console.log(this.filter.selectedAirlines);
    console.log(this.filter.selectedAirlines.length);
    console.log(!this.filter.selectedAirlines.includes('United') 
    && !this.filter.selectedAirlines.includes('Delta')
    && !this.filter.selectedAirlines.includes('American'));
  }

  ngOnInit(): void {
    this.appService.setSearch({origin: {name: "", state: "", stateCode: ""} , destination: {name: "", state: "", stateCode: ""} , departureDate: ""});
    let date = new Date();
    for (let i=0; i<7; i++) {
      this.dates.push(date.toLocaleString("en-US", {month: "numeric", day: "numeric"}));
      date.setDate(date.getDate() + 1);
    }
    
  }

  updateSearch() {
   this.appService.setSearch(this.search);
   this.appService.setFilter(this.filter);
   this.appService.setSortOption(this.sortOption);
  }

}