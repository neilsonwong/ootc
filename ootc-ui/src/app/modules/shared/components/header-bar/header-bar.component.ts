import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILinkItem } from 'src/app/interfaces/ILinkItem';
import { UserAuthContext } from 'src/app/models/UserAuthContext';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  @Input() title: string;

  public navLinks: ILinkItem[][];
  public highlight: string;

  public securityLevels: number[];
  public securityClearance: number = 0;
  public name: string;

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
      // this.updateHighlight(this.location.path(false));
      this.updateLinkClassBasedOnSecurityClearance();
    });

    this.location.onUrlChange((url: string, state: unknown) => {
      // this.updateHighlight(url);
    });
  }

  setupLinks() {
    this.navLinks = [[
      { text:'Home', url: '', icon: 'home', class: {} },
      { text:'Login', url: '/login', icon: 'account_circle', class: {} },
      { text:'Register', url: '/register', icon: 'face', class: {} },
    ],
    [
      { text: 'Volunteer', url: '/signup', icon: 'how_to_reg', class: {} },
      { text: 'My Schedule', url: '/myschedule', icon: 'calendar_today', class: {} },
    ]
    ,[
      { text: 'Users', url: '/admin/users', icon: 'supervised_user_circle', class: {} },
      { text: 'Setup', url: '/admin/setup', icon: 'pages', class: {} },
      { text: 'Schedule', url: '/admin/schedule', icon: 'insert_invitation', class: {} },
      { text: 'Attendance', url: '/admin/attendance', icon: 'schedule', class: {} },
    ]];
  }

  // updateHighlight(newUrl: string) {
  //   for (const links of this.navLinks) {
  //     for (const navItem of links) {
  //       if (navItem.url === newUrl) {
  //         this.highlight = navItem.text;
  //         return;
  //       }
  //     }
  //   }
  // }

  updateLinkClassBasedOnSecurityClearance() {
    for (const navItem of this.navLinks[0]) {
      // if we are logged in, don't show register and login
      navItem.class.hidden = (this.securityClearance > 0);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
