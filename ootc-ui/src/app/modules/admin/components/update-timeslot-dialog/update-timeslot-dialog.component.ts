import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { Department } from 'src/app/models/Department';
import { TimeSlot } from 'src/app/models/TimeSlot';

import * as moment from 'moment';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-update-timeslot-dialog',
  templateUrl: './update-timeslot-dialog.component.html',
  styleUrls: ['./update-timeslot-dialog.component.scss']
})
export class UpdateTimeslotDialogComponent implements OnInit {
  public editTimeSlotForm: FormGroup;
  private originalTimeSlot: TimeSlotView;
  public departments: Department[];

  constructor(private scheduleService: ScheduleService,
    private dialogRef: MatDialogRef<UpdateTimeslotDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.originalTimeSlot = this.data.timeSlot;
    this.departments = this.data.departments;

    this.editTimeSlotForm = this.fb.group({
      date: [moment(this.originalTimeSlot.startDate, 'YYYY-MM-DD')],
      time: [this.originalTimeSlot.startTime, [
        Validators.pattern(/^\d{1,2}:\d{2}$/)
      ]],
      duration: [this.originalTimeSlot.duration,[
        shared,
        Validators.minLength(1)]],
      department: [this.originalTimeSlot.departmentId],
      signUpCap: [this.originalTimeSlot.signUpCap,[
        shared,
        Validators.minLength(1)]],
      desc: [this.originalTimeSlot.desc,
        Validators.minLength(1)]
    });

    // add validators
  }

  onUpdate() {
    const timeSlotWithUpdates = new TimeSlot(this.originalTimeSlot.id,
      (this.editTimeSlotForm.get('date').value as moment.Moment).format('YYYY-MM-DD'),
      this.editTimeSlotForm.get('time').value,
      this.editTimeSlotForm.get('duration').value,
      this.editTimeSlotForm.get('department').value,
      this.editTimeSlotForm.get('signUpCap').value,
      this.editTimeSlotForm.get('desc').value);

    this.scheduleService.updateTimeSlot(timeSlotWithUpdates).subscribe((res: TimeSlot) => {
      this.dialogRef.close(res);
    });
  }

  ErrorMessages: { [key: string]: string } = {
    pattern: 'Email must be a valid email address (abc@tccc.ca).',
    role: 'Must be a valid role',
    date: 'Must be between Jan 26 - March 29',
    time: 'Must be a valid time (Ex. 12:00)',
    duration: 'Must be greater than 1',
    signupcap: 'Must be greater or equal to the original cap'
    //unique: 'Passwords must contain at least 1 uppercase character'
  };

}

function shared(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== undefined && (isNaN(control.value) || control.value < 0 || control.value > 1000)) {
      return { 'value': true };
  }
  return null;
}