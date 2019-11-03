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

  private users: User[];
  private date: Date = new Date();
  
  public userIdentifyForm: FormGroup;
  public userFound: boolean = false;
  public confirmed = false;

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
    this.reservationService.reservationSignin(this.userIdentifyForm.get('email').value).subscribe();
    this.confirmed = true;
    console.log("it works");
  }  

}
