import {Component, OnInit, OnDestroy, ViewChild, HostListener, ElementRef, AfterViewChecked } from '@angular/core';
import { MatSnackBar, MatMenuTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgProgress } from '@ngx-progressbar/core';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';

import { BookmarkService } from '../../../services/bookmark.service';
import { CommentService } from '../../../services/comment.service';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services';

import { Bookmark } from '../../../models/bookmark.model';
import { Comment } from '../../../models/comment.model';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-detail-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit, AfterViewChecked, OnDestroy {

  post: Post;
  postSafeContent: SafeHtml;
  postRendered: boolean;
  rate: number;
  postId: number;
  authorName: string;
  authorInfo: string;
  review_count: number;
  isAuthorVisible: boolean;
  showReference: boolean;
  showReferenceState: string;

  comments: Comment[];

  paramsSub: Subscription;

  rateList = [
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'}
  ];

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild('postContent') postContent: ElementRef;

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private postService: PostService,
    private authService: AuthService,
    private commentService: CommentService,
    private bookmarkService: BookmarkService,
    private sanitizer: DomSanitizer) {

    this.rate = 0;
    this.review_count = 0;
    this.isAuthorVisible = false;
    this.showReferenceState = 'Show more';
    this.showReference = false;
    this.postRendered = false;
    this.postSafeContent = '';

    this.post = new Post();
  }

  // gets the postId from article page and gets the postInfo and the commentInfo with postId from server
  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.progress.start();
      this.postId = params['id'];

      const commentSub = this.commentService.comments(this.postId).subscribe(c => {
        this.comments = c;

        commentSub.unsubscribe();
      },
      err => {
        this.progress.complete();
        commentSub.unsubscribe();
      });

      const postSub = this.postService.fetchById(this.postId).subscribe(p => {
        this.post = p;
        this.setDropcap();
        // change Pre tag to Div tag
        this.postSafeContent = this.sanitizeHTML(this.changePreToDiv(p.content));
        this.progress.complete();
        postSub.unsubscribe();
      },
      err => {
        this.progress.complete();
        postSub.unsubscribe();
      });
    },
    err => {
      this.progress.complete();
    });
  }

  setDropcap(): void {
    this.post.content = this.post.content.replace(/<p[^>]*>(\w)/,  '<p class="first-big">$1');
    this.post.content = this.post.content.replace(/<p[^>]*><span[^>]*>(\w)/,  '<p class="first-big"><span>$1');
  }

  ngAfterViewChecked(): void {
    if (this.postContent.nativeElement.innerHTML !== '' && !this.postRendered) {
      this.postRendered = true;

      setTimeout(() => {
       this.changeLayoutOfPost();
       this.fetchAuthorInfo();
       this.removeAuthorInfo();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.trigger.closeMenu();
  }

  @HostListener('window:resize', [])
  onresize() {
    this.reLayout('div');
  }

  // change Pre tag to Div tag
  changePreToDiv(html) {
    html = html.toString();

    html = html.replace(/<pre>/g, '<div><p>“</p><p>');
    html = html.replace(/<\/pre>/g, '</p></div>');

    return html;
  }

  // change the layout of a post
  changeLayoutOfPost() {
    this.reLayout('div');
    this.reLayout('table');
    this.reLayout('figcaption');
    this.reLayout('ol');
  }

  // custome the style of the content
  reLayout(tagName): void {
    const paretTag = this.postContent.nativeElement;
    const tag = paretTag.getElementsByTagName(tagName);
    if (tag && tag.length > 0) {

      let i = 0;
      for (i = 0; i < tag.length; i++) {
        switch (tagName) {
          case 'div':
            this.changeFormatOfCallOut(tag[i]);
            break;
          case 'figcaption':
            tag[i].innerHTML = this.changeFont(tag[i]);
            break;
          case 'table':
            this.changeTableFormat(tag[i]);
            break;
          case 'ol':
            const prevElement = tag[i].previousElementSibling;
            if (prevElement.tagName === 'H2' && prevElement.innerHTML.indexOf('References') > -1) {
              if (tag[i].children.length > 5) {
                tag[i].classList.add('show-more');
                setTimeout(() => {
                  this.showReference = true;
                });
              } else {
                setTimeout(() => {
                  this.showReference = false;
                });
              }
            }
            break;
          default:
            break;
        }

        tag[i].style.width = '100%';
        tag[i].style.height = 'auto';
      }
    }
  }

  // modify the format of callout
  changeFormatOfCallOut(tag) {
    const pTagArr = tag.getElementsByTagName('p');
    if (pTagArr && pTagArr.length === 2) {
      pTagArr[0].classList.add('callout');
      pTagArr[0].classList.add('symbol');

      pTagArr[1].classList.add('callout');
      pTagArr[1].classList.add('text');

      pTagArr[0].style.height = pTagArr[1].offsetHeight + 'px';
    }
  }

  // modify the format of a table
  changeTableFormat(tag) {
    tag.removeAttribute('width');

    const trTag = tag.getElementsByTagName('tr');

    let index = 0;
    for (index = 0; index < trTag.length; index++) {
      const tdTagArr = trTag[index].getElementsByTagName('td');

      if (tdTagArr && tdTagArr.length === 2) {
        tdTagArr[0].removeAttribute('width');
        tdTagArr[1].removeAttribute('width');

        tdTagArr[0].style.width = '5%';
        tdTagArr[1].style.width = '95%';
      }
    }
  }

  // change the font if tagName is figcaption
  changeFont(tag) {
    // font family
    let text = tag.innerHTML;

    const textArray = text.split('.');
    if (!text.includes('font-weight') &&
     textArray.length > 0 && textArray[0].includes('Figure')) {
      text = text.replace(textArray[0], `<span style="font-weight:700">${textArray[0]}</span>`);
    }

    // font style
    tag.style.fontStyle = 'italic';

    // font size
    const fontSize = parseInt(window.getComputedStyle(tag).fontSize, 10);
    switch (fontSize) {
      case 16:
        tag.style.fontSize = '15px';
        break;
      case 15:
        tag.style.fontSize = '14px';
        break;
      case 14:
        tag.style.fontSize = '13px';
        break;
      case 12:
        tag.style.fontSize = '11px';
        break;
      default:
        break;
    }

    return text;
  }

  // fetch an author/speaker's name
  fetchAuthorInfo() {
    const parentTag = this.postContent.nativeElement;
    const tag = parentTag.getElementsByTagName('p');
    const videoTag = parentTag.getElementsByTagName('video');

    if (tag && tag.length > 0) {
      let authorTag;
      if (videoTag && videoTag.length > 0 && !tag[0].innerHTML.includes('(')) {
        authorTag = tag[1].innerHTML;

      } else if (tag[0].innerHTML.includes('(')) {
        authorTag = tag[0].innerHTML;

      } else {
        document.getElementById('author-avatar').style.display = 'none';

        return;
      }

      if (authorTag.includes('strong')) {
        authorTag = authorTag.replace('<strong>', '');
        authorTag = authorTag.replace('</strong>', '');
      }

      const authorArr = authorTag.split('<br>');
      let authorName = authorArr.length > 0 ? authorArr[0] : null;
      let authorInfo = authorArr.length > 1 ? authorArr[1] : null;

      if (authorName.includes('(') && authorName.includes(')')) {
        if (authorName.includes('By')) {
          authorName = authorName.replace('By', '');
        }

        authorName = authorName.replace('(', '');
        authorName = authorName.replace(')', '');

        this.authorName = authorName;

        this.activeAuthorLayout();
      }

      if (authorInfo && authorInfo.includes('[') && authorInfo.includes(']')) {

        authorInfo = authorInfo.replace('[', '');
        authorInfo = authorInfo.replace(']', '');

        this.authorInfo = authorInfo;
      }
    }
  }

  // remove author's info
  removeAuthorInfo() {
    const parentTag = this.postContent.nativeElement;
    const tag = parentTag.getElementsByTagName('p');
    const videoTag = parentTag.getElementsByTagName('video');

    if (tag && tag.length > 0) {
      if (videoTag && videoTag.length > 0 &&
        !tag[0].innerHTML.includes('(') && tag[1].innerHTML.includes('(')) {

        tag[1].innerHTML = '';
        tag[1].style.margin = '0';

      } else if (tag[0].innerHTML.includes('(')) {
        tag[0].innerHTML = '';
        tag[0].style.margin = '0';
      }
    }
  }

  sanitizeHTML(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  onClickReference() {
    const reference = this.postContent.nativeElement.getElementsByTagName('ol')[0];
    if (reference.classList.contains('show-more')) {
      this.showReferenceState = 'Show less';
      reference.classList.remove('show-more');
      reference.classList.add('show-less');
    } else {
      this.showReferenceState = 'Show more';
      reference.classList.remove('show-less');
      reference.classList.add('show-more');
    }
  }

  // set format of an author field
  activeAuthorLayout() {
    this.isAuthorVisible = true;

    if (!this.authorName.includes('DSODentist')) {
      document.getElementById('author-avatar').style.display = 'none';
    } else {
      this.authorName = '';
    }

    if (this.authorInfo) {
      document.getElementById('author-info').style.marginTop = '5px';
    }
  }

  // filter categories
  filterCategories(categories) {
    if (categories && categories.length > 1) {
      return categories[1].name;

    } else if (categories && categories.length === 1) {
      return categories[0].name;
    }

    return '';
  }

  // post the page to review all comments with postId
  onViewAll(postId): void {
    this.router.navigate([`/reviews/view/${postId}`]);
  }

  // post the page to add reivew with postId
  onAddReview(postId, title, date): void {
    this.router.navigate([`/reviews/add/${postId}/${title}/${date}`]);
  }

  // add bookmark
  onAddBookmark(): void {
    this.post.bookmarked = true;
    const email = this.authService.getUserInfo().user_name;

    const bookmarkSub = this.bookmarkService.saveBookmark(<Bookmark>{
      email: email,
      title: this.post.title,
      postId: this.post.id.toString(),
      url: 'http://www.dsodentist.com',
    }).subscribe(x => {
      this.snackBar.open('Bookmark added', 'OK', {
        duration: 2000,
      });

      bookmarkSub.unsubscribe();
    });
  }

  // remove bookmark
  onRemoveBookmark(): void {
    this.post.bookmarked = false;

    const bookmarkSub = this.bookmarkService.deleteOneById(this.post.bookmarkId).subscribe(x => {
      this.snackBar.open('Bookmark removed', 'OK', {
        duration: 2000,
      });

      bookmarkSub.unsubscribe();
    });
  }

  // get averave rating of the comments by postId
  getRating(comments, type): any {
    if (!comments) {
      return 0;
    }

    const len = comments.length;

    if (len === 0) {
      return 0;
    }

    let i = 0;
    let sumRating = 0;
    for ( i = 0; i < len; i++) {
      sumRating = sumRating + comments[i].rating;
    }

    const avgRating = sumRating / len;

    if (type) {
      return Math.floor(avgRating);
    }

    return avgRating.toFixed(1);
  }

  // change the format of the data
  dateFormat(date): any {
    if (date) {
      return formatDate(date, 'MMM d, y', 'en-US');
    }

    return '';
  }
}
