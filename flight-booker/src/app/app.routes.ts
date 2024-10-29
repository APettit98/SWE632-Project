import { Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightSelectorComponent } from './flight-selector/flight-selector.component';
import { FlightReservationComponent } from './flight-reservation/flight-reservation.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { BookingViewerComponent } from './booking-viewer/booking-viewer.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingCancelComponent } from './booking-cancel/booking-cancel.component';
import { CancelConfirmationComponent } from './cancel-confirmation/cancel-confirmation.component';
import { ForgotBookingComponent } from './forgot-booking/forgot-booking.component';

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
    },
    {
        path: 'booking',
        component: BookingViewerComponent
    },
    {
        path: 'details',
        component: BookingDetailsComponent
    },
    {
        path: 'cancel',
        component: BookingCancelComponent
    },
    {
        path: 'cancelConfirm',
        component: CancelConfirmationComponent
    },
    {
        path: 'forgot',
        component: ForgotBookingComponent
    }
];
