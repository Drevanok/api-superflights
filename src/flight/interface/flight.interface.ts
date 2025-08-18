import { IPassenger } from "src/passenger/interfaces/passenger.interface";

export interface IFlight extends Document {
    pilot: string;
    airplane: string;
    destinationCity: string;
    flightDate: Date;
    passengers: IPassenger[];
}