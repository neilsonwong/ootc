import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAuthContext } from 'src/app/models/UserAuthContext';

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
  highlight: string;

  securityLevels: number[];
  securityClearance: number = 0;
  name: string;

  constructor(private authService: AuthenticationService,
    private location: Location, 
    private router: Router) { }

  ngOnInit() {
    this.setupLinks();
    this.securityLevels = Array(this.navLinks.length).fill(0).map((x,i)=>i);
    this.authService.getAuthContextStream().subscribe((authContext: UserAuthContext) => {
      if (authContext) {
        this.securityClearance = authContext.securityClearance;
        this.name = authContext.fname || '';
      }
      this.updateHighlight(this.location.path(false));
    });

    this.location.onUrlChange((url: string, state: unknown) => {
      this.updateHighlight(url);
    });
  }

  setupLinks() {
    this.navLinks = [[
      new LinkItem('Home', '/'),
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

  updateHighlight(newUrl: string) {
    if (newUrl.length === 0) {
      // this on on home
      this.highlight = 'Home';
      return;
    }

    for (const links of this.navLinks) {
      for (const navItem of links) {
        if (navItem.url === newUrl) {
          this.highlight = navItem.text;
          return;
        }
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
