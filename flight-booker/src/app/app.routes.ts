import { Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightSelectorComponent } from './flight-selector/flight-selector.component';
import { FlightReservationComponent } from './flight-reservation/flight-reservation.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';

export const routes: Routes = [
    {
        path: '',
        component: FlightSearchComponent
    },
    {
        path: 'select',
        component: FlightSelectorComponent
    },
    {
        path: 'reserve',
        component: FlightReservationComponent
    },
    {
        path: 'confirm',
        component: BookingConfirmationComponent
    }
];
