import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-spotlight',
  templateUrl: './department-spotlight.component.html',
  styleUrls: ['./department-spotlight.component.scss']
})
export class DepartmentSpotlightComponent implements OnInit {
  constructor( ) { }

  ngOnInit() {

  }

  kitchen = false;
  hospitality = false;
  clothingbank = false;
  setup = false;
  specialservices = false;
  main = false;
  onBack(){
    this.main = false;
    this.kitchen = false;
    this.hospitality = false;
    this.clothingbank = false;
    this.setup = false;
    this.specialservices = false;
  }
  onKitchen(){
    this.kitchen = true;
    this.main = true;
  }
  onHospitality(){
    this.hospitality = true;
    this.main = true;
  }
  onClothingbank(){
    this.clothingbank = true;
    this.main = true;
  }
  onSetup(){
    this.setup = true;
    this.main = true;
  }
  onSpecialservices(){
    this.specialservices = true;
    this.main = true;
  }

}
