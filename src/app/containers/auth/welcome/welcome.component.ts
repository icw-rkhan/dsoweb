import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'dso-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  checkIsStudent: boolean;
  signup: boolean;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/profile']);
    }
  }

  signUpOrLogin(signup: boolean = false) {
    this.signup = signup;

    if (signup === false) {
      localStorage.setItem('is_student', '1');
      this.router.navigate(['/auth', 'login']);
    }
    this.checkIsStudent = true;
  }

  redirect(is_student: string) {
    localStorage.setItem('is_student', is_student);
    const url = this.signup ? ['/auth', 'register'] : ['/auth', 'login'];
    this.router.navigate(url);
  }
}
