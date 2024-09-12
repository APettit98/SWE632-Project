export interface Flight {
    date: string;
    origin: string;
    originCode: string;
    destinatoin: string;
    destinationCode: string;
    airline: string;
    departureTime: string;
    arrivalTime: string;
    duration: number;
    economyPrice: number;
    businessPrice: number;
    firstPrice: number;    
}