import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  public date: Date = new Date();
  public userIdentifyForm: FormGroup;
  public userFound: boolean = false;
  public confirmed = false;
  public id: any;

  constructor(private fb: FormBuilder,
    private reservationService: ReservationService) { }

  ngOnInit() {
    this.userIdentifyForm = this.fb.group({
      email: ['', [
        Validators.pattern('[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}'),
    ]]
    });
  }

  userCheckIn() {
    // date formatting: yyyy-mm-dd
    this.reservationService.reservationSignin(this.userIdentifyForm.get('email').value, this.date.toString()).subscribe((res: boolean) => {
        this.confirmed = true;
        console.log("it works");
    });
  }  
}
