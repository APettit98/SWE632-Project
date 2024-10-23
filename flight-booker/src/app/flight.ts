import { City } from "./city";

export interface Flight {
    id: string;
    date: string;
    origin: City;
    originCode: string;
    destination: City;
    destinationCode: string;
    airline: string;
    departureTime: string;
    arrivalTime: string;
    duration: number;
    economyPrice: number;
    businessPrice: number;
    firstPrice: number;    
}