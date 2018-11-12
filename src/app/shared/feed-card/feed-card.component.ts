import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';
import { AuthService } from '../../services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'dso-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedCardComponent {
  public isViewMore: boolean;
  @Input() post: Post;
  @Input() no: number;

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) {
    this.isViewMore = false;
  }

  onAddBookmark() {
    this.post.bookmarked = true;
    const email = this.authService.getUserInfo().user_name;
    this.addBookmark.emit(<Bookmark>{
      email: email,
      title: this.post.title,
      postId: this.post.id.toString(),
      url: 'http://www.dsodentist.com',
    });
  }

  onRemoveBookmark() {
    this.post.bookmarked = false;
    this.removeBookmark.emit(this.post.bookmarkId);
  }

  onViewDetail() {
    if (this.post.tags.includes(parseInt(environment.SPONSOR_GSK, 10)) ||
        this.post.tags.includes(parseInt(environment.SPONSOR_ALIGN, 10)) ||
        this.post.tags.includes(parseInt(environment.SPONSOR_NOBEL, 10))) {
      this.router.navigate([`/detail/sponsor/${this.post.id}`]);
    } else {
      this.router.navigate([`/detail/${this.post.id}`]);
    }
  }

  onCheckSponsorType(tags, sponsorId: number) {
    return tags.includes(sponsorId);
  }

  onCheckCategoryType(categories, catId: number) {
    return categories.filter(category => category.id === catId).length > 0;
  }

  onViewMore(e) {
    this.isViewMore = !this.isViewMore;

    if (this.isViewMore) {
      e.target.innerText = 'Less';
    } else {
      e.target.innerText = '... More';
    }
    e.stopPropagation();
  }

  // post sponsor article by postId
  onPostSponsor(type) {
    let sponsorId;
    if (type === 'gsk') {
      sponsorId = environment.SPONSOR_GSK;
    } else if (type === 'align') {
      sponsorId = environment.SPONSOR_ALIGN;
    } else if (type === 'nobel') {
      sponsorId = environment.SPONSOR_NOBEL;
    }
    this.router.navigate([`/posts/sponsor/${sponsorId}`]);
  }

  // fetch an author/speaker's name
  fetchAuthorInfo() {
    const parentTag = document.getElementById(`contents${this.no}`);
    const tag = parentTag.getElementsByTagName('p');

    if (tag && tag.length > 0) {
      let authorTag;
      if (tag[0].innerHTML.includes('(')) {
        authorTag = tag[0].innerHTML;
      } else {
        return;
      }

      if (authorTag.includes('strong')) {
        authorTag = authorTag.replace('<strong>', '');
        authorTag = authorTag.replace('</strong>', '');
      }

      const authorArr = authorTag.split('<br>');
      let authorName = authorArr.length > 0 ? authorArr[0] : null;

      if (authorName.includes('(') && authorName.includes(')')) {
        if (authorName.includes('By')) {
          authorName = authorName.replace('By', '');
        }

        authorName = authorName.replace('(', '');
        authorName = authorName.replace(')', '');

        this.removeAuthorInfo();

        if (tag.length > 1) {
          tag[0].innerHTML = `<span style="color:#616161;font-size:15px;font-weight:700;line-height:35px">${authorName}</span>`;
          tag[1].classList.add('first-big');
        }
      }
    }
  }

  // remove author's info
  removeAuthorInfo() {
    const parentTag = document.getElementById(`contents${this.no}`);
    const tag = parentTag.getElementsByTagName('p');

    if (tag && tag.length > 0) {
      if (tag[0].innerHTML.includes('(') && tag.length > 1) {

        tag[0].innerHTML = '';
        tag[0].style.margin = '0';
      }
    }
  }

  // filter categories
  filterCategories(categories) {
    return categories[0].name;
  }

  // check gsk tag
  isGsk(tags): boolean {
    if (tags && tags.includes(parseInt(environment.SPONSOR_GSK, 10))) {
      return true;
    }
    return false;
  }

  // check align tag
  isAlign(tags): boolean {
    if (tags && tags.includes(parseInt(environment.SPONSOR_ALIGN, 10))) {
      return true;
    }
    return false;
  }

  // check nobel tag
  isNobel(tags): boolean {
    if (tags && tags.includes(parseInt(environment.SPONSOR_NOBEL, 10))) {
      return true;
    }
    return false;
  }
}
