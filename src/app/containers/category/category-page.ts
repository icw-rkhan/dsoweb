import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { MatSelectChange, MatSnackBar } from '@angular/material';
import { NgProgress } from '@ngx-progressbar/core';
import { map } from 'rxjs/internal/operators';
import * as _ from 'lodash';

import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';
import { BookmarkService } from '../../services/bookmark.service';
import { AuthService } from '../../services';

@Component({
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.scss']
})
export class CategoryPageComponent implements OnInit {

  categories$: Observable<Category[]>;
  posts: Post[];

  constructor(private categoryService: CategoryService, private postService: PostService,
              private progress: NgProgress, private bookmarkService: BookmarkService,
              private snackBar: MatSnackBar, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories;
  }

  selectCategory(event: MatSelectChange) {
    this.progress.start();

    const email = this.authService.getUserInfo().user_name;
    const postsSubs = forkJoin(
      this.postService.fetchByCategory(event.value),
      this.bookmarkService.getAllByEmail(email)
    ).pipe(
      map(items => items[0].map(p => {
        const bookmark = items[1].find(b => +b.postId === p.id);
        return Object.assign({}, p, {
          bookmarked: !_.isUndefined(bookmark),
          bookmarkId: !_.isUndefined(bookmark) ? bookmark.id : undefined
        });
      }))
    ).subscribe(posts => {
      this.progress.complete();
      this.posts = posts;
      postsSubs.unsubscribe();
    });
  }

  addBookmark(value: Bookmark) {
    const bookmarkSub = this.bookmarkService.saveBookmark(value).subscribe(x => {
      this.snackBar.open('Bookmark added', 'OK', {
        duration: 2000,
      });
      bookmarkSub.unsubscribe();
    });
  }

  removeBookmark(id: string) {
    const bookmarkSub = this.bookmarkService.deleteOneById(id).subscribe(x => {
      this.snackBar.open('Bookmark removed', 'OK', {
        duration: 2000,
      });
      bookmarkSub.unsubscribe();
    });
  }

}
