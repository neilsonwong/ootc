import { ReservationView } from '../models/ReservationView';

export interface IGroupedReservations {
    [s: string]: ReservationView[];
}
