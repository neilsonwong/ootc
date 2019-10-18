import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAuthContext } from 'src/app/models/UserAuthContext';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public authContext: UserAuthContext;
  public loggedInAs: string;

  constructor(private authService: AuthenticationService) { }

  title = 'Welcome!';
  description = 'Introduction: Welcome to Out of The cold';

  ngOnInit() {
    this.authService.getAuthContextStream()
      .subscribe((authContext: UserAuthContext) => {
        this.authContext = authContext;
          if (this.authContext) {
            this.loggedInAs = this.authContext.username;
          }
      });
  }
}
