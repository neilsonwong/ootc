import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/Department';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs/operators';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService  {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService) { }

  getDepartments(): Observable<Department[]> {
    const url = `${API_URL}/user/departments`;
    return this.http.get<Department[]>(url)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't get the list of departments at this time!`);
        return throwError(error);
      }));
  }

  addDepartment(departmentName: string, description: string): Observable<Department> {
    const url = `${API_URL}/admin/departments/add`;
    return this.http.post<Department>(url, { departmentName: departmentName, description: description })
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't add the new department!`);
        return throwError(error);
      }));
  }

  updateDepartment(department: Department): Observable<Department> {
    const url = `${API_URL}/admin/departments/update`;
    return this.http.post<Department>(url, department)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't update the department!`);
        return throwError(error);
      }));
  }
}
