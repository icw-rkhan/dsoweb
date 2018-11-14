import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'dso-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() toggleMenu = new EventEmitter();

  title: string;
  btnTitle: string;
  url: string;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private _location: Location) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;

        if (event.url.includes('/posts/sponsor')) {
          this.title = 'SPONSORED CONTENT';
          this.btnTitle = 'keyboard_backspace';

        } else if (event.url.includes('/posts')) {
            this.title = 'DSODENTIST';
            this.btnTitle = 'menu';

        } else if (event.url.includes('/reviews/add')) {
            this.title = 'ADD A REVIEW';
            this.btnTitle = 'keyboard_backspace';

        } else if (event.url.includes('/reviews/view')) {
            this.title = 'ALL REVIEWS';
            this.btnTitle = 'keyboard_backspace';

        } else if (event.url.includes('/detail/sponsor')) {
            this.title = 'SPONSORED CONTENT';
            this.btnTitle = 'keyboard_backspace';

        } else if (event.url.includes('/detail')) {
            this.title = '';
            this.btnTitle = 'keyboard_backspace';

        } else if (event.url.includes('/bookmarks')) {
          this.title = 'BOOKMARKS';
          this.btnTitle = 'menu';

        } else if (event.url.includes('/category')) {
          this.title = 'CATEGORY';
          this.btnTitle = 'menu';

        } else if (event.url.includes('/search')) {
          this.title = 'SEARCH';
          this.btnTitle = 'menu';

        } else if (event.url.includes('/profile')) {
          this.title = 'PROFILE';
          this.btnTitle = 'menu';

        } else if (event.url.includes('/unite')) {
          this.title = 'UNITE';
          this.btnTitle = 'menu';

        } else {
          this.title = 'DSODENTIST';
          this.btnTitle = 'menu';
        }

        this.removeADSCode();

        this.cdr.markForCheck();
      }
    });
  }

  removeADSCode() {
    const old_childs = document.getElementsByClassName('ads_script');

    if (old_childs.length > 1) {
      document.head.removeChild(old_childs[0]);
      document.head.removeChild(old_childs[0]);
    }
  }

  onClickEvent() {
    if (this.btnTitle === 'menu') {
      this.toggleMenu.emit();
    } else if (this.btnTitle === 'keyboard_backspace') {
      this._location.back();
    }
  }
}
