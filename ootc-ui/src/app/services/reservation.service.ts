import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  getReservations(): Observable<Reservation[]> {
    return of(null);
  }
  addReservation(reservation: Reservation): Observable<Reservation> {
    return of(null);
  }

  deleteReservation(reservationId: number): Observable<boolean> {
    return of(null);
  }

  getReservationsForUser(userId: string): Observable<Reservation[]> {
    return of(null);
  }

  addReservationForUser(reservation: Reservation): Observable<Reservation> {
    return of(null);
  }

  reservationSignin(userId: string): Observable<boolean> {
    return of(null);
  }

}
