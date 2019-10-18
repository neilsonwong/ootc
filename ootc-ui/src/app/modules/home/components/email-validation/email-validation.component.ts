import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.scss']
})
export class EmailValidationComponent implements OnInit {
  public email: string;
  public validationCodeString: string;
  public isValidating: boolean = true;
  public validationSuccess: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit() {
    const combinedCode: string = this.activatedRoute.snapshot.queryParamMap.get('code');
    // decode the combined code
    const combinedString: string = window.atob(combinedCode);
    [this.email, this.validationCodeString] = combinedString.split(':');
    this.validate();
  }

  validate() {
    try {
      const validationCode:number = parseInt(this.validationCodeString);
      this.authService.validateEmail(this.email, validationCode)
        .subscribe((result: boolean) => {
          this.validationSuccess = result;
          this.isValidating = false;
        });
    }
    catch(e) {
      this.validationSuccess = false;
      this.isValidating = false;
    }
  }

  resendValidation() {
    alert('resend validation');
  }
}
