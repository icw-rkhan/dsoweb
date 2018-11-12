import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { forkJoin, Observable } from 'rxjs';
import * as _ from 'lodash';

import { Post, PostArgs } from '../models/post.model';
import { environment } from '../../environments/environment';
import { BookmarkService } from './bookmark.service';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private bookmarkService: BookmarkService, private authService: AuthService) {
  }

  posts(args: PostArgs): Observable<Post[]> {
    let url = `${environment.cmsApiUrl}/posts?_embed&order=desc`;
    if (args.page) {
      url += `&page=${args.page}`;
    }
    if (args.per_page) {
      url += `&per_page=${args.per_page}`;
    }

    let result = this.http.get(url).pipe(
      map((response: any[]) => response.map(post => new Post().deserialize(post)))
    );
    // Filter locally by category
    if (args.type) {
      result = result.pipe(map(posts => posts.filter(post => post.format === args.type)));
    }

    return result;
  }

  fetchByCategory(args: PostArgs): Observable<Post[]> {
    let url = `${environment.cmsApiUrl}/posts?_embed&categories=${args.categoryId}`;
    if (args.page) {
      url += `&page=${args.page}`;
    }
    if (args.per_page) {
      url += `&per_page=${args.per_page}`;
    }

    return this.http.get(url).pipe(
      map((response: any[]) => response.map(post => new Post().deserialize(post)))
    );
  }

  fetchById(id: number): Observable<Post> {
    const url = `${environment.cmsApiUrl}/posts/${id}?_embed`;
    const email = this.authService.getUserInfo().user_name;

    return forkJoin(
      this.http.get(url).pipe(
        map((response: any) => new Post().deserialize(response))
      ),
      this.bookmarkService.getAllByEmail(email)
    ).pipe(
      map(join => {
        const post = join[0];
        const bookmarks = join[1];
        // Check if post has bookmarked
        const bookmark = bookmarks.find(b => +b.postId === post.id);
        // Add bookmarks attributes
        return Object.assign({}, post, {
          bookmarked: !_.isUndefined(bookmark),
          bookmarkId: !_.isUndefined(bookmark) ? bookmark.id : undefined
        });
      })
    );
  }

  search(term: string): Observable<Post[]> {
    const url = `${environment.cmsApiUrl}/posts?_embed&search=${term}&order=desc`;
    return this.http.get(url).pipe(
      map((response: any[]) => response.map(post => new Post().deserialize(post)))
    );
  }

  fetchBySponsorId(args: PostArgs): Observable<Post[]> {
    let url = `${environment.cmsApiUrl}/posts?_embed&tags=${args.sponsorId}&order=desc`;
    if (args.categoryId) {
      url += `&categories=${args.categoryId}`;
    }
    if (args.page) {
      url += `&page=${args.page}`;
    }
    if (args.per_page) {
      url += `&per_page=${args.per_page}`;
    }
    return this.http.get(url).pipe(
      map((response: any[]) => response.map(post => new Post().deserialize(post)))
    );
  }

}
