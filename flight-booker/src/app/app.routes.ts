import { Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightSelectorComponent } from './flight-selector/flight-selector.component';

export const routes: Routes = [
    {
        path: '',
        component: FlightSearchComponent
    },
    {
        path: 'select',
        component: FlightSelectorComponent
    }
];
