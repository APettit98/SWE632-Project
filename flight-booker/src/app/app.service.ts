import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlightSearch } from "./flightSearch";


@Injectable({
    providedIn: 'root'
})
export class AppService {
    private search = new BehaviorSubject({origin: "", destination: "", departureDate: ""});
    getSearch = this.search.asObservable();

    constructor() {}

    setSearch(search: FlightSearch) {
        this.search.next(search);
    }
}