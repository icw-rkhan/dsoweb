import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

import { NavLinkModel } from '../../models/nav-link.model';
import { Params } from '@angular/router/src/shared';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: './feed-page.html',
  styleUrls: ['./feed-page.scss'],
})
export class FeedPageComponent implements OnInit, OnDestroy {

  url: string;
  isGeneral: boolean;
  slideUrls: string[];
  slideHeight: string;
  headerImageUrl: string;
  navLinks: NavLinkModel[] = [];

  private currentUrl: string;
  private routerSubs: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentUrl = router.url;
    this.slideUrls = [
      'assets/images/slide/slide-1.jpg',
      'assets/images/slide/slide-2.jpg',
      'assets/images/slide/slide-3.jpg',
      'assets/images/slide/slide-4.jpg',
      'assets/images/slide/slide-5.jpg',
    ];

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        if (event.url.includes('/posts/sponsor')) {
          this.isGeneral = false;
          const sponsorId = event.url.split('/')[3];

          if (sponsorId === environment.SPONSOR_GSK) {
            this.headerImageUrl = 'assets/images/sponsor/gsk-header.png';
          } else if (sponsorId === environment.SPONSOR_NOBEL) {
            this.headerImageUrl = 'assets/images/sponsor/nobel-header.png';
          } else if (sponsorId === environment.SPONSOR_ALIGN) {
            this.headerImageUrl = 'assets/images/sponsor/align-header.png';
          }
        } else if (event.url.includes('/posts')) {
          this.isGeneral = true;
          this.headerImageUrl = 'assets/images/header-pic.png';
        }
      }
    });
  }

  ngOnInit(): void {
    this.slideHeight = `${Math.round(document.body.clientWidth * 0.55)}px`;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    // Check when it is a sponsor page
    const children = this.route.children[0];
    const childrenSubs = children.params.subscribe((p: Params) => {
      this.navLinks = this.renderTabs(p['sponsorId']);
      if (childrenSubs) {
        childrenSubs.unsubscribe();
      }
    });

    this.routerSubs = this.router.events.subscribe((event: Event) => {
      const innerChildren = this.route.children[0];
      if (event instanceof NavigationEnd) {
        const innerChildrenSubs = innerChildren.params.subscribe((p: Params) => {
          this.navLinks = this.renderTabs(p['sponsorId']);
          if (innerChildrenSubs) {
            innerChildrenSubs.unsubscribe();
          }
        });
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.slideHeight = `${Math.round(document.body.clientWidth * 0.55)}px`;
  }

  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

  isActive(link: NavLinkModel) {
    return this.currentUrl === link.route;
  }

  private renderTabs(sponsorId: number) {
    const navLinks: NavLinkModel[] = [];
    if (sponsorId) {
      navLinks.push({
        label: 'LATEST',
        route: `/posts/sponsor/${sponsorId}`,
      });
      navLinks.push({
        label: 'VIDEOS',
        route: `/posts/sponsor/${sponsorId}/29`,
      });
      navLinks.push({
        label: 'ARTICLES',
        route: `/posts/sponsor/${sponsorId}/28`,
      });
      navLinks.push({
        label: 'PODCASTS',
        route: `/posts/sponsor/${sponsorId}/30`,
      });
      navLinks.push({
        label: 'SPONSORED',
        subMenu: [
          {
            label: 'Align Technology',
            route: `/posts/sponsor/${environment.SPONSOR_ALIGN}`
          },
          {
            label: 'GlaxoSmithKline',
            route: `/posts/sponsor/${environment.SPONSOR_GSK}`
          },
          {
            label: 'Nobel Biocare',
            route: `/posts/sponsor/${environment.SPONSOR_NOBEL}`
          }
        ],
      });
      navLinks.push({
        label: 'TECH GUIDES',
        route: `/posts/sponsor/${sponsorId}/31`,
      });
      navLinks.push({
        label: 'INTERVIEWS',
        route: `/posts/sponsor/${sponsorId}/194`,
      });
    } else {
      navLinks.push({
        label: 'LATEST',
        route: '/posts/type/623',
      });
      navLinks.push({
        label: 'VIDEOS',
        route: '/posts/type/29',
      });
      navLinks.push({
        label: 'ARTICLES',
        route: '/posts/type/28',
      });
      navLinks.push({
        label: 'PODCASTS',
        route: '/posts/type/30',
      });
      navLinks.push({
        label: 'SPONSORED',
        subMenu: [
          {
            label: 'Align Technology',
            route: `/posts/sponsor/${environment.SPONSOR_ALIGN}`
          },
          {
            label: 'GlaxoSmithKline',
            route: `/posts/sponsor/${environment.SPONSOR_GSK}`
          },
          {
            label: 'Nobel Biocare',
            route: `/posts/sponsor/${environment.SPONSOR_NOBEL}`
          }
        ],
      });
      navLinks.push({
        label: 'TECH GUIDES',
        route: '/posts/type/31',
      });
      navLinks.push({
        label: 'INTERVIEWS',
        route: '/posts/type/194',
      });
    }
    return navLinks;
  }

}
