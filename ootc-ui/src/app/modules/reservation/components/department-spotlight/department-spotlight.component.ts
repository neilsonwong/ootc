import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Department } from 'src/app/models/Department';

@Component({
  selector: 'app-department-spotlight',
  templateUrl: './department-spotlight.component.html',
  styleUrls: ['./department-spotlight.component.scss']
})
export class DepartmentSpotlightComponent implements OnInit, OnChanges {
  @Input() departments: Department[];
  @Output() deptSelected = new EventEmitter<Department>();

  public selectedIndex: number;
  
  constructor( ) { }

  ngOnInit() {
    this.selectedIndex = -1;
  }

  ngOnChanges() {

  }

  selectDept(event) {
    const departmentId: number = event.value;
    // find the right dept and set it as selected
    const found = this.departments.findIndex(d => {
      return d.id === departmentId
    });

    if (found !== undefined) {
      this.selectedIndex = found;
      this.deptSelected.emit(this.departments[this.selectedIndex]);
    }
    else {
      console.log('could not select department with id ' + departmentId);
    }
  }

  onBack() {
    this.selectedIndex = -1;
  }
}
