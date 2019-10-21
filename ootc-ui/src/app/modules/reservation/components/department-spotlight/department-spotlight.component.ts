import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Department } from 'src/app/models/Department';

@Component({
  selector: 'app-department-spotlight',
  templateUrl: './department-spotlight.component.html',
  styleUrls: ['./department-spotlight.component.scss']
})
export class DepartmentSpotlightComponent implements OnInit, OnChanges {
  @Input() departments: Department[];
  public selectedIndex: number;
  public blurbs: string[][];
  
  constructor( ) { }

  ngOnInit() {
    this.selectedIndex = -1;
  }

  ngOnChanges() {
    this.processDepartmentDescriptions();
  }

  processDepartmentDescriptions() {
    this.blurbs = this.departments.map((dept: Department) => {
      return dept.description.split('\n');
    });
  }

  selectDept(departmentId: number) {
    // find the right dept and set it as selected
    const found = this.departments.findIndex(d => {
      return d.id === departmentId
    });

    if (found !== undefined) {
      this.selectedIndex = found;
    }
    else {
      console.log('could not select department with id ' + departmentId);
    }
  }

  onBack() {
    this.selectedIndex = -1;
  }
}
