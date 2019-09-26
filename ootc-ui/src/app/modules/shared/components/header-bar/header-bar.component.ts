import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

class LinkItem {
  text: string;
  url: string;
  constructor(text, url) {
    this.text = text;
    this.url = url;
  }
}

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  @Input() title: string;

  // TODO: can convert this to input later
  navLinks: LinkItem[][];

  securityLevels: number[];
  securityClearance: number = 0;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.setupLinks();
    this.securityLevels = Array(this.navLinks.length).fill(0).map((x,i)=>i);
    this.securityClearance = this.authService.getSecurityClearance();
    console.log(this.securityClearance);
  }

  setupLinks() {
    this.navLinks = [[
      new LinkItem('Home', '/'),
      new LinkItem('About', '/about'),
      new LinkItem('Register', '/register'),
    ],
    [
      new LinkItem('Sign Up', '/signup'),
      new LinkItem('Reservations', '/reservations'),
    ]
    ,[
      new LinkItem('Users', '/admin/users'),
      new LinkItem('Setup', '/admin/setup'),
      new LinkItem('Schedule', '/admin/schedule'),
      new LinkItem('Attendance', '/admin/attendance'),
    ]];
  }
}
