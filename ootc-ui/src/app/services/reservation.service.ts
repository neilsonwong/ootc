import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../models/Reservation';
import { ReservationView } from '../models/ReservationView';
import { errorsAreFalse, map200toTrue } from '../utils/httpUtil';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getTimeSlots(): Observable<ReservationView[]> {
    const url = `${API_URL}/admin/reservations/all`;
    return this.http.get<ReservationView[]>(url);
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    const url = `${API_URL}/user/reservations/add`;
    return this.http.post<Reservation>(url, {reservation: reservation});
  }

  cancelReservation(reservationId: number): Observable<boolean> {
    const url = `${API_URL}/user/reservations/cancel`;
    return this.http.post(url, {reservationId: reservationId}, { observe: 'response' })
      .pipe(map200toTrue(), errorsAreFalse());
  }

  deleteReservation(reservationId: number): Observable<boolean> {
    const url = `${API_URL}/admin/reservations/delete`;
    return this.http.post<Reservation>(url, {reservationId: reservationId})
      .pipe(map200toTrue(), errorsAreFalse());
  }

  getReservationsForUser(): Observable<ReservationView[]> {
    const url = `${API_URL}/user/reservations`;
    return this.http.get<ReservationView[]>(url);
  }

  addReservationForUser(reservation: Reservation): Observable<Reservation> {
    const url = `${API_URL}/admin/reserve`;
    return this.http.post<Reservation>(url, reservation);
  }

  reservationSignin(userId: string, date?: string): Observable<boolean> {
    const url = `${API_URL}/registration/signin`;
    const reqBody = {userId: userId, date: undefined};
    if (date) {
      reqBody.date = date;
    }
    return this.http.post<boolean>(url, reqBody)
      .pipe(map200toTrue(), errorsAreFalse());
  }
}
