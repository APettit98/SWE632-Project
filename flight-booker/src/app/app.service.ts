import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlightSearch } from "./flightSearch";
import { Booking } from "./booking";
import * as flightData from "./flightData.json";


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
    private flightData = new BehaviorSubject(flightData);
    
    getSearch = this.search.asObservable();
    getBooking = this.booking.asObservable();
    getFlightData = this.flightData.asObservable();

    constructor() {}

    setSearch(search: FlightSearch) {
        this.search.next(search);
    }

    setBooking(booking: Booking) {
        this.booking.next(booking);
    }

    setFlightData(data: any) {
        this.flightData.next(data);
    }
}