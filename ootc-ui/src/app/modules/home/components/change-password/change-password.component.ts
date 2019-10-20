import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public passwordChanged: boolean = false;
  public email: string;

  private resetCode: string;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.has('code')) {
      const combinedCode: string = this.activatedRoute.snapshot.queryParamMap.get('code');
      // decode the combined code
      const combinedString: string = window.atob(combinedCode);
      [this.email, this.resetCode] = combinedString.split(':');
    }
    else {
      // no code passed, this means the user navigated here so we are probably logged in
      this.email = this.authService.getAuthContext().username;
      this.resetCode = null;
    }

    this.changePasswordForm = this.fb.group({
      oldPassword: [''],
      newPassword: ['', [Validators.minLength(8), Validators.required]]
    }, Validators.required);
  }

  changePassword() {
    this.authService.changePassword(
      this.email,
      this.resetCode,
      this.changePasswordForm.get('oldPassword').value,
      this.changePasswordForm.get('newPassword').value)
      .subscribe((data) => {
        this.passwordChanged = true;
      });
  }
}
