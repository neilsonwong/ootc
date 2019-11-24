import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../models/Reservation';
import { ReservationView } from '../models/ReservationView';
import { errorsAreFalse, map200toTrue } from '../utils/httpUtil';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService) { }

  getReservations(): Observable<ReservationView[]> {
    const url = `${API_URL}/admin/reservations/all`;
    return this.http.get<ReservationView[]>(url)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't get the list of all reservations at this time!`);
        return throwError(error);
      }));
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    const url = `${API_URL}/user/reservations/add`;
    return this.http.post<Reservation>(url, {reservation: reservation})
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't sign you up at this time! Please try again later.`);
        return throwError(error);
      }));
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
    return this.http.post<Reservation>(url, reservation)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't sign this person up! Please try again later.`);
        return throwError(error);
      }));
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
