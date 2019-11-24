import { ReservationView } from '../models/ReservationView';

export interface IGroupedReservationViews {
    [s: string]: ReservationView[];
}
