import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { SharingService } from '../../../services/sharing.service';
import { ApiErrorService, AuthService } from '../../../services';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'dso-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  checkIsStudent: boolean;
  isShowPassword: boolean;
  is_student: any;
  form: FormGroup;
  isUserAuthenticated: Observable<boolean>;
  isInitialized: Observable<boolean>;
  isUserAuthenticatedEmittedValue: boolean;
  isInitializedEmittedValue: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private apiError: ApiErrorService,
    private sharingService: SharingService
  ) {
    this.sharingService.showLoading(true);
    this.isShowPassword = false;
    this.checkIsStudent = false;
  }

  ngOnInit() {
    this.sharingService.showLoading(true);
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const code = params['code'];  // login with linkedin
      if (code && code !== '') {
        this.getAccessToken(code);
      } else {
        setTimeout(() => {
          this.sharingService.showLoading(false);
        });
      }
    });
    this.initForm();
    this.is_student = +localStorage.getItem('is_student');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        CustomValidators.email
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  submit() {
    this.sharingService.showLoading(true);
    this.form.value.username = this.form.value.username.toLowerCase();
    const subLogin = this.authService.login(this.form.value).subscribe(
      (data: any) => {
        this.sharingService.showLoading(false);
        if (!data.code) {
          this.authService.loginSuccess(data);
          subLogin.unsubscribe();

          this.router.navigate(['/posts']);
        } else {
          this.apiError.checkError(data.code, this.form.value, 'login');

          subLogin.unsubscribe();
        }
      },
      err => {

        this.sharingService.showLoading(false);
        subLogin.unsubscribe();
      }
    );
  }

  onLoginLinkedIn() {
    const redirectUri = `${document.location.origin}/auth/login`;
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${environment.linkedinClientId}&redirect_uri=${redirectUri}&state=1234567`
    window.location.href = url;
  }

  private getAccessToken(code: string) {
    const linkedinLogin = this.authService.requestAccessToken({code: code, redirectUrl: `${document.location.origin}/auth/login`})
      .subscribe((data: any) => {
        this.sharingService.showLoading(false);
        if (!data.code) {
          this.authService.linkedInLoginSuccess(data);
          linkedinLogin.unsubscribe();

          this.router.navigate(['/posts']);
        } else {
          // this.apiError.checkError(data.code, this.form.value, 'login');

          linkedinLogin.unsubscribe();
        }
      });
  }

  signUp() {
    this.checkIsStudent = true;
  }

  redirect(is_student: string) {
    localStorage.setItem('is_student', is_student);
    this.router.navigate(['/auth', 'register']);
  }

}
