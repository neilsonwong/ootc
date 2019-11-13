import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { Department } from 'src/app/models/Department';
import { TimeSlot } from 'src/app/models/TimeSlot';

import * as moment from 'moment';

@Component({
  selector: 'app-update-timeslot-dialog',
  templateUrl: './update-timeslot-dialog.component.html',
  styleUrls: ['./update-timeslot-dialog.component.scss']
})
export class UpdateTimeslotDialogComponent implements OnInit {
  public editTimeSlotForm: FormGroup;
  private originalTimeSlot: TimeSlotView;
  private departments: Department[];

  constructor(private dialogRef: MatDialogRef<UpdateTimeslotDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.originalTimeSlot = this.data.timeSlot;
    this.departments = this.data.departments;

    this.editTimeSlotForm = this.fb.group({
      date: [moment(this.originalTimeSlot.startDate, 'YYYY-MM-DD')],
      time: [this.originalTimeSlot.startTime],
      duration: [this.originalTimeSlot.duration],
      department: [this.originalTimeSlot.departmentId],
      signUpCap: [this.originalTimeSlot.signUpCap],
      desc: [this.originalTimeSlot.desc]
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
    // TODO: Add in actual call
    console.log(timeSlotWithUpdates);
  }
}
