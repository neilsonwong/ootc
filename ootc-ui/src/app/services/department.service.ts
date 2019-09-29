import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department } from '../models/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  getDepartments(): Observable<Department[]> {
    return of([
      new Department(1, 'Hospitality'),
      new Department(2, 'Kitchen'),
      new Department(3, 'Clothing Bank'),
      new Department(4, 'Registration'),
      new Department(5, 'Setup/Cleanup'),
      new Department(6, 'Special Services'),
    ]);
  }

  addDepartment(departmentName: string): Observable<Department> {
    return of(new Department(20, departmentName)); 
  }

  updateDepartment(department: Department): Observable<Department> {
    return of(department); 
  }
}
