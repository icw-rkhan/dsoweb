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

    this.addADSCodeTo();
  }

  addADSCodeTo() {
      const script1 = document.createElement('script');
      script1.setAttribute('class', 'ads_script');
      script1.setAttribute('async', '');
      script1.setAttribute('src', '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');

      const script2 = document.createElement('script');
      script2.setAttribute('class', 'ads_script');
      script2.innerHTML = '(adsbygoogle = window.adsbygoogle || []) .push (' +
        '{ google_ad_client: "ca-pub-5793099538711899", enable_page_level_ads: true });';

      document.head.appendChild(script1);
      document.head.appendChild(script2);
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
