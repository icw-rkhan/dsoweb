import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'dso-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  isShowPassword: boolean;
  is_student: any;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.isShowPassword = false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: any) => {
        if (params.is_student) {
          this.is_student = +params.is_student;
        }
        this.initForm();
      }
    );
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
    this.authService.login(this.form.value).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
  }
}
