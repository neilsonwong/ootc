import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TimeSlot } from '../models/TimeSlot';
import { TimeSlotDefinition } from '../models/TimeSlotDefinition';
import { TimeSlotView } from '../models/TimeSlotView';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
        map((timeSlots: TimeSlowView[]) => {
          return timeSlots.sort((a,b) => {
            if (a.startDate < b.startDate) {
              return -1;
            } else if (a.startDate === b.startDate) {
              return a.startTime - b.startTime;
            }
            return 1;
          })
        })
      );
  }

  // decided this would be handled by front end, no longer needed
  // getAvailableTimeSlots(): Observable<TimeSlotView[]>{
  //   return of([
  //     new TimeSlotView(1, '2019-10-20', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
  //     new TimeSlotView(2, '2019-10-20', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
  //     new TimeSlotView(3, '2019-10-27', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
  //     new TimeSlotView(4, '2019-10-27', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
  //     new TimeSlotView(5, '2019-11-03', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
  //     new TimeSlotView(6, '2019-11-03', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
  //     new TimeSlotView(7, '2019-11-10', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
  //     new TimeSlotView(8, '2019-11-10', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
  //   ]);
  // }
}
