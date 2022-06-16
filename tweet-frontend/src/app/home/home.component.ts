import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

   username:String;
   showAllTweets:Boolean;
   showAllUsers:Boolean;
   showSearchUser:Boolean;
   showUserTweets:Boolean;

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.showUserTweets=true;
  }

  onClick(value){
    if(value=='tweets'){
      this.showAllTweets=true;
      this.showAllUsers=false;
      this.showSearchUser=false;
      this.showUserTweets=false;
    }
    else if(value='allUsers'){
      this.showAllTweets=false;
      this.showAllUsers=true;
      this.showSearchUser=false;
      this.showUserTweets=false;
    }
    else if(value='search'){
      this.showAllTweets=false;
      this.showAllUsers=false;
      this.showSearchUser=true;
      this.showUserTweets=false;
    }
    else if(value='userTweets'){
      this.showAllTweets=false;
      this.showAllUsers=false;
      this.showSearchUser=false;
      this.showUserTweets=true;
    }
  }

}
