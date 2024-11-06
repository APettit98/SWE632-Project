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

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}


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
  emptyCity = {name: "", state: "", stateCode: ""}
  originFormControl = new FormControl(this.emptyCity, Validators.required);
  destinationFormControl = new FormControl(this.emptyCity, Validators.required);
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
    
    this.getClosestCity(this.flightData.cities).then((closestCity) => {
      if (closestCity) {
        this.originFormControl.setValue(closestCity);
      }
    });

  }

  updateSearch() {
   this.appService.setSearch(this.search);
   this.appService.setFilter(this.filter);
   this.appService.setSortOption(this.sortOption);
  }

  getClosestCity(cities: { name: string, state: string, stateCode: string, code: string, lat: number, lon: number }[]) {
    return new Promise<{ name: string, state: string, stateCode: string, code: string, lat: number, lon: number } | null>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by this browser.');
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          let closestCity = null;
          let minDistance = Infinity;
  
          for (const city of cities) {
            const distance = calculateDistance(latitude, longitude, city.lat, city.lon);
            if (distance < minDistance) {
              minDistance = distance;
              closestCity = city;
            }
          }
  
          resolve(closestCity);
        }, error => {
          reject('Unable to retrieve your location.');
        });
      }
    });
  }
}