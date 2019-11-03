import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public resetSent: boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required]
    }, Validators.required);
  }

  resetPassword() {
    this.userService.resetPassword(this.resetPasswordForm.get('email').value)
      .subscribe();
  	this.resetSent = true;
  }
}
