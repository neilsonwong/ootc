import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/Department';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  // TODO: TEST ALL OF THESE
  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    const url = `${API_URL}/user/departments`;
    return this.http.get<Department[]>(url);
  }

  addDepartment(departmentName: string): Observable<Department> {
    const url = `${API_URL}/admin/departments/add`;
    return this.http.post<Department>(url, { departmentName: departmentName });
  }

  updateDepartment(department: Department): Observable<Department> {
    const url = `${API_URL}/admin/departments/update`;
    return this.http.post<Department>(url, { department: department });
  }
}
