import { Reservation } from '../models/Reservation';

export interface IGroupedReservations {
    [s: string]: Reservation[];
}
