import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgProgressModule } from '@ngx-progressbar/core';
import { MatDatepickerModule } from '@angular/material';

import { SharedModule } from './shared';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ReviewsModule } from './containers/reviews/reviews.module';
import { FeedModule } from './containers/feed/feed.module';
import { DetailModule } from './containers/detail/detail.module';
import { SearchPageModule } from './containers/search/search-page.module';
import { CategoryPageModule } from './containers/category/category-page.module';
import { BookmarksPageModule } from './containers/bookmarks/bookmarks-page.module';
import { ProfileModule } from './containers/profile/profile.module';
import { EditProfileModule } from './containers/edit-profile/edit-profile.module';
import { UniteModule } from './containers/unite/unite.module';
import { CareerModule } from './containers/career/career.module';
import { AuthGuard } from './services/auth/auth-guard';
import { environment } from '../environments/environment';
import { TokenInterceptor } from './services/auth/auth.interceptor';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL }
  };
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgProgressModule.forRoot({
      meteor: false,
      color: '#354051'
    }),
    // Module import
    SharedModule,
    ReviewsModule,
    FeedModule,
    DetailModule,
    SearchPageModule,
    CategoryPageModule,
    BookmarksPageModule,
    ProfileModule,
    EditProfileModule,
    UniteModule,
    CareerModule,
    AppRoutingModule,
    MatDatepickerModule
  ],
  providers: [
    AuthGuard,
    // Inject apiKey and, optionally, authorize to integrate with LinkedIN official API
    {provide: 'apiKey', useValue: environment.linkedinClientId},
    {provide: 'authorize', useValue: 'true'}, // OPTIONAL by default: false
    {provide: 'isServer', useValue: 'true'},  // OPTIONAL by default: false
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [MatDatepickerModule],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
