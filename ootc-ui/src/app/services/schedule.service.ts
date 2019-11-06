import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TimeSlot } from '../models/TimeSlot';
import { TimeSlotDefinition } from '../models/TimeSlotDefinition';
import { TimeSlotView } from '../models/TimeSlotView';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Reservation } from '../models/Reservation';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getSchedule(): Observable<TimeSlotDefinition[]> {
    const url = `${API_URL}/admin/schedule`;
    return this.http.get<TimeSlotDefinition[]>(url);
  }

  addScheduleItem(timeSlotDef: TimeSlotDefinition): Observable<TimeSlotDefinition> {
    const url = `${API_URL}/admin/schedule/add`;
    return this.http.post<TimeSlotDefinition>(url, { timeSlotDef: timeSlotDef });
  }

  removeScheduleItem(timeSlotDefId: number): Observable<boolean> {
    const url = `${API_URL}/admin/schedule/remove`;
    return this.http.post(url, { timeSlotDefId: timeSlotDefId })
      .pipe(
        map((response: any) => {
          if (response.status === 200) {
            return true;
          }
          return false;
        })
      );
  }

  updateScheduleItem(timeSlotDef: TimeSlotDefinition): Observable<TimeSlotDefinition> {
    const url = `${API_URL}/admin/schedule/update`;
    return this.http.post<TimeSlotDefinition>(url, { timeSlotDef: timeSlotDef });
  }

  generateSchedule(timeSlotDef: TimeSlotDefinition): Observable<TimeSlot[]> {
    const url = `${API_URL}/admin/schedule/generate`;
    return this.http.post<TimeSlot[]>(url, { timeSlotDef: timeSlotDef });
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
        map((timeSlots: TimeSlotView[]) => {
          return timeSlots.sort((a,b) => {
            if (a.startDate < b.startDate) {
              return -1;
            } else if (a.startDate === b.startDate) {
              return a.startTime.localeCompare(b.startTime);
            }
            return 1;
          })
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
        map((timeSlots: TimeSlotView[]) => {
          return timeSlots.sort((a,b) => {
            if (a.startDate < b.startDate) {
              return -1;
            } else if (a.startDate === b.startDate) {
              return a.startTime.localeCompare(b.startTime);
            }
            return 1;
          })
        })
      );
  }

  getReservationsForTimeslot(timeSlotId: number): Observable<Reservation[]> {
    const url = `${API_URL}/admin/timeSlot/reservations`;
    const options = {
      params: new HttpParams()
        .set('timeSlotId', timeSlotId.toString())
    };
    return this.http.get<Reservation[]>(url, options);
  }

  getTimeSlot(timeSlotId: number): Observable<TimeSlotView> {
    const url = `${API_URL}/admin/timeSlot/refresh`;
    const options = {
      params: new HttpParams()
        .set('timeSlotId', timeSlotId.toString())
    };
    return this.http.get<TimeSlotView>(url, options);
  }
}
