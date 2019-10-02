import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Reservation } from '../models/Reservation';
import { ReservationView } from '../models/ReservationView';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  getReservations(): Observable<Reservation[]> {
    // not needed
    return of(null);
  }
  addReservation(reservation: Reservation): Observable<Reservation> {
    return of(reservation);
  }

  deleteReservation(reservationId: number): Observable<boolean> {
    return of(true);
  }

  getReservationsForUser(userId: string): Observable<ReservationView[]> {
    return of([
      new ReservationView(1, userId, '2019-10-20', '14:00', 2, 'Hospitality', 'Hospitality setup'),
      new ReservationView(1, userId, '2019-10-20', '16:00', 2, 'Hospitality', 'Hospitality serving dinner'),
      new ReservationView(1, userId, '2019-10-27', '14:00', 2, 'Hospitality', 'Hospitality setup'),
      new ReservationView(1, userId, '2019-10-27', '16:00', 2, 'Hospitality', 'Hospitality serving dinner'),
    ]);
  }

  addReservationForUser(reservation: Reservation): Observable<Reservation> {
    return of(reservation);
  }

  reservationSignin(userId: string): Observable<boolean> {
    return of(true);
  }
}
