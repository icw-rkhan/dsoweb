import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { ShareButtons } from '@ngx-share/core';

@Component({
  selector: 'dso-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedCardComponent implements OnInit {

  @Input() type: string;
  @Input() post: Post;

  constructor(public share: ShareButtons){}

  ngOnInit(): void {
  }
}
