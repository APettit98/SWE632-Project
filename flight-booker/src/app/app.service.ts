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
        origin: {name: "", state: "", stateCode: ""} , 
        destination:{name: "", state: "", stateCode: ""} , 
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

    constructor() {
        const originalData = this.flightData.getValue();
        let sortedCities = originalData.cities.sort((a: any, b: any) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              } else {
                return 0;
              }
            });
            
        const updatedData = { ...originalData, cities: sortedCities };
        this.flightData.next(updatedData);
    }

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