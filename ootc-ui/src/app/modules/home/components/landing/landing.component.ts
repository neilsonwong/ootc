import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  title = 'Welcome!';
  description = 'Introduction: Welcome to Out of The cold';

  ngOnInit() {
  }

}
