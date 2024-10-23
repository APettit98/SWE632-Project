import { City } from "./city";

export interface FlightSearch {
    origin: City;
    destination: City;
    departureDate: string;
}