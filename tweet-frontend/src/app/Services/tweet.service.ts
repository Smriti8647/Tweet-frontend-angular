import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ApiResponse } from '../model/ApiResponse';
import { Subject } from 'rxjs';

export interface CreateTweet {
  avtar: String
  username: String;
  message: String;
}
@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private baseUrl = 'http://localhost:9090/api/v1.0/tweets/';
  constructor(private client: HttpClient,
    private userService: UserService) {

     }

  httpOptions: Object;

  setAuthHeader(){ 
    let result = new Subject<Object>();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'json'
    }
    setTimeout(()=>{
      result.next(this.httpOptions);
    },100)
   
    return result.asObservable();
  }

  public allTweet() {

    this.client.get(this.baseUrl + 'all', this.httpOptions).subscribe(result => {
      console.log(result);
    },
      (error) => {
        console.log("error" + error);
      })
  }

  public userTweets(username: String) {
    this.setAuthHeader();
    return this.client.get<ApiResponse>(this.baseUrl + username, this.httpOptions);
  }

  public allTweets() {
    this.setAuthHeader();
    return this.client.get<ApiResponse>(this.baseUrl+'all', this.httpOptions);
  }

  public createTweet(username: String, message: String) {
    var avatar;
    this.userService.getUser(username).subscribe(result => {
      avatar = result.data['avtar'];
      this.callTweetApi(username,message,avatar);
    }) 

  }

  public callTweetApi(username: String, message: String, avatar:String){
    let createTweet={
      avtar:avatar,
      loginId: username,
      message: message
    }
    this.setAuthHeader();
    this.client.post(this.baseUrl + username + '/add', createTweet ,this.httpOptions).subscribe(result=>{
      console.log(result)
    },
    error=>{
      console.log(error);
    })
  }
  
  public likeTweet(username: String, tweetId: String) {
   console.log(this.httpOptions)
  // this.setAuthHeader().subscribe((http)=>{
   // console.log("ye kaya")
   const token = `Bearer ${localStorage.getItem('token')}`;
   console.log(token)
   let headers = new HttpHeaders();//.set("Authorization",token);
headers = headers.append("Authorization",token);
//headers = headers.append("Content-Type", 'application/json');
console.log(headers)
    this.client.put(this.baseUrl + username + '/like/'+tweetId ,headers).subscribe(result=>{
      console.log("response kha hai")
      console.log(result)
    },
    error=>{
      console.log(error);
    }) ;
  // });
   

  }
}
