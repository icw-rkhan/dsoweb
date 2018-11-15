import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FeedPageComponent } from './feed-page';
import { AuthGuard } from '../../services/auth/auth-guard';
import { PostsPageComponent } from './posts-page/posts-page';

export const ROUTES: Routes = [
  {
    path: 'posts',
    canActivate: [AuthGuard],
    component: FeedPageComponent,
    children: [
      {
        path: '',
        redirectTo: '/posts/type/623',
        pathMatch: 'full'
      },
      {
        path: 'type',
        component: PostsPageComponent,
      },
      {
        path: 'type/:id',
        component: PostsPageComponent,
      },
      {
        path: 'sponsor/:sponsorId',
        component: PostsPageComponent,
      },
      {
        path: 'sponsor/:sponsorId/:id',
        component: PostsPageComponent,
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class FeedRoutingModule {
}
