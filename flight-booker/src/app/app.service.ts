import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlightSearch } from "./flightSearch";
import { Booking } from "./booking";


@Injectable({
    providedIn: 'root'
})
export class AppService {
    // Used to share flight search parameters
    private search = new BehaviorSubject({
        origin: "", 
        destination: "", 
        departureDate: ""
    });
    
    // Used to share selected flight id
    private booking = new BehaviorSubject({
        flightId: "",
        firstName: "",
        lastName: "",
        email: "",
        bookingCode: "",
        fareClass: ""
    });
    
    getSearch = this.search.asObservable();
    getBooking = this.booking.asObservable();

    constructor() {}

    setSearch(search: FlightSearch) {
        this.search.next(search);
    }

    setBooking(booking: Booking) {
        this.booking.next(booking);
    }
}