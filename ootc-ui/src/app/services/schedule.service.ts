import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TimeSlot } from '../models/TimeSlot';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor() { }

  // getSchedule(): Observable<TimeSlotDef[]> {
  //   return of(null);
  // }

  // addScheduleItem(timeSlotDef: TimeSlotDef): Observable<TimeSlot> {
  //   return of(null);
  // }

  removeScheduleItem(timeSlotDefId: number): Observable<TimeSlot> {
    return of(null);
  }

  // updateScheduleItem(timeSlotDef: TimeSlotDef): Observable<TimeSlotDef> {
  //   return of(null);
  // }

  // generateSchedule(timeSlotDef: TimeSlotDef): Observable<Reservation[]> {
  //   return of(null);
  // }

  getTimeSlots(): Observable<TimeSlot[]>{
    return of(null);
  }

  getAvailableTimeSlots(): Observable<TimeSlot[]>{
    return of(null);
  }
}
