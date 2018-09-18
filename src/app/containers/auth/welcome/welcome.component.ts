import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SharingService} from '../../../services/sharing.service';

@Component({
  selector: 'dso-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  checkIsStudent: boolean;
  signup: boolean;

  constructor(
    private router: Router,
    private sharingService: SharingService) {
    this.sharingService.showLoading̣̣(true);
  }

  ngOnInit() {
    this.sharingService.showLoading̣̣(false);
  }

  signUpOrLogin(signup: boolean = false) {
    this.signup = signup;
    this.checkIsStudent = true;
  }

  redirect(is_student: string) {
    localStorage.setItem('is_student', is_student);
    const url = this.signup ? ['/auth', 'register'] : ['/auth', 'login'];
    this.router.navigate(url);
  }
}
