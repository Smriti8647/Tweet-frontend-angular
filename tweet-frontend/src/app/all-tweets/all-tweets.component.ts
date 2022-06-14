import { Component, OnInit } from '@angular/core';
import { TweetService } from '../Services/tweet.service';

@Component({
  selector: 'app-all-tweets',
  templateUrl: './all-tweets.component.html',
  styleUrls: ['./all-tweets.component.scss']
})
export class AllTweetsComponent implements OnInit {

  tweets;
  constructor(private service:TweetService) { }

  ngOnInit(): void {
    this.service.allTweets().subscribe(result => {
      this.tweets=result.data;
    },
      (error) => {
        console.log("error" + error);
      });
  }

}
