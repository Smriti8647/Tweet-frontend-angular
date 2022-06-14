import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from '../Services/tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  @Input() username:String;
  tweets;
  message:String;

  constructor(private service:TweetService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTweets();
    
  }


  getTweets(){
    //this.username = this.route.snapshot.paramMap.get('username');
    this.service.userTweets(this.username).subscribe(result => {
      this.tweets=result.data
    },
      (error) => {
        console.log("error" + error);
      });
  }

  createTweet(){
    this.service.createTweet(this.username,this.message);
  }

 
}
