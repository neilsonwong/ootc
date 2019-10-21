import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/Department';

@Component({
  selector: 'app-reservation-sign-up',
  templateUrl: './reservation-sign-up.component.html',
  styleUrls: ['./reservation-sign-up.component.scss']
})
export class ReservationSignUpComponent implements OnInit {
  public reservations: any[];
  public departments: Department[];

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.reservations = [];
    this.departments = [];
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments()
      .subscribe((departments: Department[]) => {
        this.departments = departments;
        console.log(this.departments);
      });
  }

}
