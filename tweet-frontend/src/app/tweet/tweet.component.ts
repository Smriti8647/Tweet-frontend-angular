import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { TweetService } from '../Services/tweet.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  //@Input() username: String;
  username: String;
  tweets;
  message: String;
  isReply = new Map();
  heading:String;

  constructor(private service: TweetService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() {
    this.username = this.route.snapshot.paramMap.get('username');
    if(this.username=='all'){
      this.heading='ALL';
      this.service.allTweets().subscribe(result => {
        this.tweets=result.data;
        this.mapTweets(result.data);
      },
        (error) => {
          console.log("error" + error);
        });
    }
    else{
      this.heading=this.username.toUpperCase();
    this.service.userTweets(this.username).subscribe(result => {
       this.tweets=result.data
      this.mapTweets(result.data);
      console.log(this.tweets)
    },
      (error) => {
        console.log("error" + error);
      });
    }
  }

  createTweet() {
    this.service.createTweet(this.username, this.message);
  }

  mapTweets(data: any) {
    let i = 0;
    this.tweets = data.map(element => {
      this.isReply.set(i, [false, "Show reply"]);
      i = i + 1;
      return {
        ...element,
        avtar: '/assets/' + element.avtar + '.png',
        time: moment(element.time).fromNow(),
        commentList: this.formatComment(element.commentList),
        likeImage: this.setLikeImage(element)
      }
    });
  }

  formatComment(commentList: any) {
    if (commentList)
      return commentList.map(element => {
        return {
          ...element,
        time: moment(element.time).fromNow()
        }
      });
  }
  setLikeImage(tweet: any) {
    if (tweet.isLikeList != null) {
      if (tweet.isLikeList.find(x => x === tweet.loginId) != null) {
        return '/assets/like.png';
      }
    }
    return '/assets/un-like.png';
  }
  setLike(like: any, index: number) {
    console.log(like);
    if (like === "/assets/like.png") {
      console.log("un-like" + this.tweets[index]['loginId'] + " - " + this.tweets[index]['id']);
    } else {
      this.service.setAuthHeader();
      this.service.likeTweet(this.tweets[index]['loginId'],this.tweets[index]['id']);
      console.log("like");
      console.log("un-like" + this.tweets[index]['loginId'] + " - " + this.tweets[index]['id']);
    }

  }

  showReply(index: any) {
    if (this.isReply.get(index)[1] == "Show reply") {
      this.isReply.set(index, [true, "Hide reply"]);
    } else {
      this.isReply.set(index, [false, "Show reply"]);
    }
  }

}
