import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    // Instantiate the form control
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }
  
  onLogin() {
    this.error = null;
    this.authService.login(
      this.loginForm.get('email').value.toString().toLowerCase(),
      this.loginForm.get('password').value)
      .pipe(take(1))
      .subscribe((errorMessage) => {
        if (errorMessage === null) {
          this.router.navigate(['/signup']);
        }
        else {
          this.error = errorMessage;
        }
      });
  }
}
