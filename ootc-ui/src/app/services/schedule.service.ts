import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TimeSlot } from '../models/TimeSlot';
import { TimeSlotDefinition } from '../models/TimeSlotDefinition';
import { TimeSlotView } from '../models/TimeSlotView';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Reservation } from '../models/Reservation';
import { ErrorService } from './error.service';
import { map200toTrue, errorsAreFalse } from '../utils/httpUtil';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService) { }

  getSchedule(): Observable<TimeSlotDefinition[]> {
    const url = `${API_URL}/admin/schedule`;
    return this.http.get<TimeSlotDefinition[]>(url)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't retrieve the schedule at this time! Please try again later.`);
        return throwError(error);
      }));
  }

  addScheduleItem(timeSlotDef: TimeSlotDefinition): Observable<TimeSlotDefinition> {
    const url = `${API_URL}/admin/schedule/add`;
    return this.http.post<TimeSlotDefinition>(url, { timeSlotDef: timeSlotDef })
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't create the schedule template at this time! Please try again later.`);
        return throwError(error);
      }));
  }

  removeScheduleItem(timeSlotDefId: number): Observable<boolean> {
    const url = `${API_URL}/admin/schedule/remove`;
    return this.http.post(url, { timeSlotDefId: timeSlotDefId })
      .pipe(map200toTrue(), errorsAreFalse());
  }

  updateScheduleItem(timeSlotDef: TimeSlotDefinition): Observable<TimeSlotDefinition> {
    const url = `${API_URL}/admin/schedule/update`;
    return this.http.post<TimeSlotDefinition>(url, { timeSlotDef: timeSlotDef })
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't update the schedule template at this time! Please try again later.`);
        return throwError(error);
      }));
  }

  generateSchedule(timeSlotDef: TimeSlotDefinition): Observable<TimeSlot[]> {
    const url = `${API_URL}/admin/schedule/generate`;
    return this.http.post<TimeSlot[]>(url, { timeSlotDef: timeSlotDef })
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't generate the schedule based on the template at this time! Please try again later.`);
        return throwError(error);
      }));
  }

  getTimeSlots(departmentId: number, startDate: string, endDate: string): Observable<TimeSlotView[]> {
    const url = `${API_URL}/user/timeSlots`;
    const options = {
      params: new HttpParams()
        .set('departmentId', departmentId.toString())
        .set('startDate', startDate)
        .set('endDate', endDate)
    };
    return this.http.get<TimeSlotView[]>(url, options)
      .pipe(
        map(mapAndSortTimeSlotViews),
        catchError((error: HttpErrorResponse) => {
          this.errorService.add(`We couldn't retrieve the schedule at this time! Please try again later.`);
          return throwError(error);
        })
      );
  }

  getAllTimeSlotsBetween(startDate: string, endDate: string): Observable<TimeSlotView[]> {
    const url = `${API_URL}/admin/timeSlots`;
    const options = {
      params: new HttpParams()
        .set('startDate', startDate)
        .set('endDate', endDate)
    };
    return this.http.get<TimeSlotView[]>(url, options)
      .pipe(
        map(mapAndSortTimeSlotViews),
        catchError((error: HttpErrorResponse) => {
          this.errorService.add(`We couldn't retrieve the schedule at this time! Please try again later.`);
          return throwError(error);
        })
      );
  }

  getReservationsForTimeslot(timeSlotId: number): Observable<Reservation[]> {
    const url = `${API_URL}/admin/timeSlot/reservations`;
    const options = {
      params: new HttpParams()
        .set('timeSlotId', timeSlotId.toString())
    };
    return this.http.get<Reservation[]>(url, options)
      .pipe(catchError((error: HttpErrorResponse) => {
          this.errorService.add(`We couldn't retrieve the volunteers the time slot at this time! Please try again later.`);
        return throwError(error);
      }));
  }

  getTimeSlot(timeSlotId: number): Observable<TimeSlotView> {
    const url = `${API_URL}/admin/timeSlot/refresh`;
    const options = {
      params: new HttpParams()
        .set('timeSlotId', timeSlotId.toString())
    };
    return this.http.get<TimeSlotView>(url, options);
  }

  updateTimeSlot(timeSlot: TimeSlot): Observable<TimeSlot> {
    const url = `${API_URL}/admin/timeSlot/update`;
    return this.http.post<TimeSlot>(url, timeSlot)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't update the time slot at this time! Please try again later.`);
        return throwError(error);
      }));
  }
}

function mapAndSortTimeSlotViews(timeSlots: TimeSlotView[]) {
  return timeSlots.sort((a,b) => {
    if (a.startDate < b.startDate) {
      return -1;
    } else if (a.startDate === b.startDate) {
      return a.startTime.localeCompare(b.startTime);
    }
    return 1;
  })
}