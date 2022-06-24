import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TweetService } from '../Services/tweet.service';

@Component({
  selector: 'app-all-tweets',
  templateUrl: './all-tweets.component.html',
  styleUrls: ['./all-tweets.component.scss']
})
export class AllTweetsComponent implements OnInit {

  tweets;
  constructor(private service:TweetService,
    private router:Router) { }

  ngOnInit(): void {
    this.service.allTweets().subscribe(result => {
      this.tweets=result.data;
    },
      (error) => {
        console.log("error" + error);
        if(error.error.error='JWT Token is Not Valid'){
          this.router.navigate(['/login']);
        }
      });
  }

}
