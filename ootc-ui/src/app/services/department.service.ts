import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department } from '../models/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  getDepartments(): Observable<Department[]> {
    return of(null);
  }

  addDepartment(departmentName: string): Observable<Department> {
    return of(null); 
  }

  updateDepartment(department: Department): Observable<Department> {
    return of(null); 
  }
}
