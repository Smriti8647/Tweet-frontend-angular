import { Component, Input, OnInit } from '@angular/core';
import { TweetService } from '../Services/tweet.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss']
})
export class CreateTweetComponent implements OnInit {

  @Input() username:String;
  message:String;

  constructor(private service:TweetService) { }

  ngOnInit(): void {
  }

  createTweet(){
    this.service.createTweet(this.username,this.message);
  }

}
