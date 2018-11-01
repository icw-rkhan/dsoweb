import { Injectable } from '@angular/core';

import { NavLinkModel } from '../models/nav-link.model';

@Injectable({
    providedIn: 'root'
  })
export class NavLinksService {
  links: NavLinkModel[] = [];

  constructor() {
    this.links.push({
      label: 'Browse Content',
      icon: 'general',
      route: '/posts',
      state: 'active'
    });
    this.links.push({
      label: 'Education',
      icon: 'education',
      route: '#',
      state: 'inactive'
    });
    this.links.push({
      label: 'Careers',
      icon: 'careers',
      route: '#',
      state: 'inactive'
    });
    this.links.push({
      label: 'Events',
      icon: 'events',
      route: '#',
      state: 'inactive'
    });
    this.links.push({
      label: 'UNITE',
      icon: 'unite',
      route: '#',
      state: 'inactive'
    });
    this.links.push({
      label: 'My Profile',
      icon: 'profile',
      route: '/profile',
      state: 'inactive'
    });
    this.links.push({
      label: 'Logout',
      icon: 'logout',
      route: '',
      state: 'inactive'
    });
  }

  getNavLinks() {
    return this.links;
  }

  initNavLinks() {
    this.links.map(link => {
      link.state = 'inactive';
    });
  }

  setNavLink(link: NavLinkModel) {
    this.links.map(item => {
      if (item === link) {
        if (item.icon !== 'logout') {
          item.state = 'active';
        } else {
          this.links[0].state = 'active';
        }
      }
    });
  }
}
