import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlightSearch } from "./flightSearch";
import { Booking } from "./booking";
import * as flightData from "./flightData.json";
import { Filter } from "./filter";

enum SortOptions {
    Price = "price",
    Duration = "duration",
    DepartureTime = "departureTime"
};


@Injectable({
    providedIn: 'root'
})
export class AppService {
    // Used to share flight search parameters
    private search = new BehaviorSubject({
        origin: {name: "", state: "", stateCode: "", lat: 0, lon: 0} , 
        destination:{name: "", state: "", stateCode: "", lat: 0, lon: 0} , 
        departureDate: new Date()
    });
    
    // Used to share selected flight id
    private booking = new BehaviorSubject({
        flightId: "",
        firstName: "",
        lastName: "",
        date: new Date(),
        email: "",
        bookingCode: "",
        fareClass: ""
    });
    private flightData = new BehaviorSubject(flightData);

    private filter = new BehaviorSubject({
        filterEconomy: true,
        filterBusiness: true,
        filterFirst: true,
        maxPrice: 2000,
        selectedAirlines: ["American", "Delta", "United"]
    });

    private sortOption = new BehaviorSubject<SortOptions>(SortOptions.Price);

    private minDate = new BehaviorSubject(new Date());

    
    getSearch = this.search.asObservable();
    getBooking = this.booking.asObservable();
    getFlightData = this.flightData.asObservable();
    getFilter = this.filter.asObservable();
    getSortOption = this.sortOption.asObservable();
    getMindate = this.minDate.asObservable();

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

    setFilter(filter: Filter) {
        this.filter.next(filter);
    }

    setSortOption(option: SortOptions) {
        this.sortOption.next(option);
    }
}