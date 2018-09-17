import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AuthService } from '../../../services/auth/auth.service';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'dso-reviews-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  rate: number;
  comment: string;
  condition: boolean;
  res: any;
  body: any;
  userInfo: any;
  articleInfo: any;
  routeParams: any;

  stateList = [{state:false},{state:false},{state:false},{state:false},{state:false}]

  constructor(public breakpointObserver: BreakpointObserver, 
    private commentService: CommentService,
    private authService: AuthService,
    private _location: Location,
    private activeRoute: ActivatedRoute) {
      this.rate = 0;
      this.comment = "";
      this.condition = false;
    }

  ngOnInit() 
  {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe(result=> {
      if(result.matches) {
        document.getElementById('contents').style.height = "36.5vh";
      }else {
        document.getElementById('contents').style.height = "calc(100vh - 411px)";
      }
    })

    this.routeParams = this.activeRoute.snapshot.params;

    this.userInfo = {
      url: this.authService.getUserInfo().user_url,
      name: this.authService.getUserInfo().user_name
    }

    this.articleInfo = {
      title: this.routeParams.postTitle,
      date: this.routeParams.postDate
    }
  }

  eventRating(event) {
    status = event.target.getAttribute('class');

    if(status.includes('inactive') && this.rate < 5) {
      this.rate++;
    }else if(this.rate > 0) {
      this.rate--;
    }
  }

  saveComment() {
    this.body = {
      'userId': this.authService.getUserInfo().user_id,
      'postId': this.routeParams.postId,
      'comment': this.comment,
      'rating': this.rate
    }

    this.res = this.commentService.setComment(this.body);
    console.log(this.res);
        
    this._location.back();
  }
}