import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-department-spotlight',
  templateUrl: './department-spotlight.component.html',
  styleUrls: ['./department-spotlight.component.scss']
})
export class DepartmentSpotlightComponent implements OnInit {
  constructor() { }

  ngOnInit() {

  }

  select = false;
  onSelect(){
    this.select = true;
  }

}
