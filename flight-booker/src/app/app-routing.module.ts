import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightSelectorComponent } from './flight-selector/flight-selector.component';
import { RouterModule, Routes } from '@angular/router';
import { FlightReservationComponent } from './flight-reservation/flight-reservation.component';

const routes: Routes = [
  {
    path: '',
    component: FlightSearchComponent
  },
  {
    path: "select",
    component: FlightSelectorComponent
  },
  {
    path: "reserve",
    component: FlightReservationComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
