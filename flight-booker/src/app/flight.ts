export interface Flight {
    id: string;
    date: string;
    origin: string;
    originCode: string;
    destination: string;
    destinationCode: string;
    airline: string;
    departureTime: string;
    arrivalTime: string;
    duration: number;
    economyPrice: number;
    businessPrice: number;
    firstPrice: number;    
}