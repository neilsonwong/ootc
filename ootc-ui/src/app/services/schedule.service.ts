import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TimeSlot } from '../models/TimeSlot';
import { TimeSlotDefinition } from '../models/TimeSlotDefinition';
import { TimeSlotView } from '../models/TimeSlotView';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor() { }

  getSchedule(): Observable<TimeSlotDefinition[]> {
    return of([
      new TimeSlotDefinition(1, '14:00', 2 /* hourss */, 1, 10, 'hospitality setup', '2019-10-20', 5, 2, 0),
      new TimeSlotDefinition(1, '16:00', 2 /* hourss */, 1, 10, 'hospitality serving dinner', '2019-10-20', 5, 2, 0),
      new TimeSlotDefinition(1, '16:00', 2 /* hourss */, 1, 10, 'hospitality clean up', '2019-10-20', 5, 2, 0),
      new TimeSlotDefinition(2, '14:00', 2 /* hourss */, 2, 10, 'cook dinner', '2019-10-20', 5, 2, 0),
      new TimeSlotDefinition(2, '20:00', 2 /* hourss */, 2, 10, 'wash dishes', '2019-10-20', 5, 2, 0),
    ]);
  }

  addScheduleItem(timeSlotDef: TimeSlotDefinition): Observable<TimeSlotDefinition> {
    return of(timeSlotDef);
  }

  removeScheduleItem(timeSlotDefId: number): Observable<boolean> {
    return of(true);
  }

  updateScheduleItem(timeSlotDef: TimeSlotDefinition): Observable<TimeSlotDefinition> {
    return of(timeSlotDef);
  }

  generateSchedule(timeSlotDef: TimeSlotDefinition): Observable<TimeSlot[]> {
    // don't need this yet
    return of(null);
  }

  getTimeSlots(): Observable<TimeSlotView[]>{
    return of([
      new TimeSlotView(1, '2019-10-20', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
      new TimeSlotView(2, '2019-10-20', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
      new TimeSlotView(3, '2019-10-27', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
      new TimeSlotView(4, '2019-10-27', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
      new TimeSlotView(5, '2019-11-03', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
      new TimeSlotView(6, '2019-11-03', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
      new TimeSlotView(7, '2019-11-10', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
      new TimeSlotView(8, '2019-11-10', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
    ]);
  }

  getAvailableTimeSlots(): Observable<TimeSlotView[]>{
    return of([
      new TimeSlotView(1, '2019-10-20', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
      new TimeSlotView(2, '2019-10-20', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
      new TimeSlotView(3, '2019-10-27', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
      new TimeSlotView(4, '2019-10-27', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
      new TimeSlotView(5, '2019-11-03', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
      new TimeSlotView(6, '2019-11-03', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
      new TimeSlotView(7, '2019-11-10', '14:00', 2, 'Hospitality', 5, 10, 'hospitality setup'),
      new TimeSlotView(8, '2019-11-10', '16:00', 2, 'Hospitality', 5, 10, 'hospitality serving dinner'),
    ]);
  }
}
