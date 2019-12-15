import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/Department';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationView } from 'src/app/models/ReservationView';
import { TranslationService } from 'src/app/services/translationService';

@Component({
  selector: 'app-reservation-sign-up',
  templateUrl: './reservation-sign-up.component.html',
  styleUrls: ['./reservation-sign-up.component.scss']
})
export class ReservationSignUpComponent implements OnInit {
  public reservations: ReservationView[];
  public departments: Department[];
  public selectedDepartment: Department;

  constructor(private departmentService: DepartmentService,
    private reservationService: ReservationService,
    private translationService: TranslationService) { }

  ngOnInit() {
    this.reservations = [];
    this.departments = [];
    this.getDepartments();
    this.getReservations();
  }

  private getDepartments() {
    this.departmentService.getDepartments()
      .subscribe((departments: Department[]) => {
        this.departments = this.translationService.translateDepartments(departments);
      });
  }

  private getReservations() {
    this.reservationService.getReservationsForUser()
      .subscribe((reservations: ReservationView[]) => {
        this.reservations = reservations;
      });
  }

  onDeptSelected(department: Department) {
    this.selectedDepartment = department;
  }

  onReservationsChanged() {
    this.getReservations();
  }
}
