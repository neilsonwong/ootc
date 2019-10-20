import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public resetSent: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required]
    }, Validators.required);
  }

  resetPassword() {
    this.authService.resetPassword(this.resetPasswordForm.get('email').value)
      .subscribe();
  	this.resetSent = true;
  }
}
