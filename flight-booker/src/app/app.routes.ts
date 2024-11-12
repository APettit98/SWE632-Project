import { Routes } from '@angular/router';
import { BookingViewerComponent } from './booking-viewer/booking-viewer.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingCancelComponent } from './booking-cancel/booking-cancel.component';
import { CancelConfirmationComponent } from './cancel-confirmation/cancel-confirmation.component';
import { ForgotBookingComponent } from './forgot-booking/forgot-booking.component';
import { StepperComponent } from './stepper/stepper.component';

export const routes: Routes = [
    {
        path: '',
        component: StepperComponent
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
