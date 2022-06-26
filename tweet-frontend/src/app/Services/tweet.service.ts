import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ApiResponse } from '../model/ApiResponse';
import { TagRequest } from '../model/TagRequest';

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
    private userService: UserService) { }

  httpOptions: Object;

  setAuthHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'json'
    }
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
    return this.client.get<ApiResponse>(this.baseUrl + 'all', this.httpOptions);
  }

  public createTweet(username: String, message: String, tagRequest: TagRequest) {
    var avatar;
    this.userService.getUser(username).subscribe(result => {
      avatar = result.data['avtar'];
      this.callTweetApi(username, message, avatar, tagRequest);
    })

  }

  public callTweetApi(username: String, message: String, avatar: String, tagRequest: TagRequest) {
    let createTweet = {
      avtar: avatar,
      loginId: username,
      message: message
    }
    var tweetId;
    this.setAuthHeader();
    this.client.post<ApiResponse>(this.baseUrl + username + '/add', createTweet, this.httpOptions).subscribe(result => {
      tweetId = result.data['tweetId'];
      tagRequest.tweetId = tweetId;
      console.log('tagrequest in service' + tagRequest.tweetId + tagRequest.users);
      this.setTag(tagRequest);

      console.log(result)
    },
      error => {
        console.log(error);
      })
  }

  public likeTweet(username: String, tweetId: String) {
    this.setAuthHeader();
    this.client.put(this.baseUrl + username + '/like/' + tweetId, {}, this.httpOptions).subscribe(result => {
      console.log(result)
    },
      error => {
        console.log(error);
      })

  }

  public taggedTweets() {
    this.setAuthHeader();
    const loginId=localStorage.getItem('loginId');
    return this.client.get<ApiResponse>(this.baseUrl+loginId+'/tags',this.httpOptions);

  }

  public setTag(tagRequest: TagRequest) {
    this.client.put(this.baseUrl + 'tag', tagRequest, this.httpOptions).subscribe(result => {
      console.log(result);
    },
      error => {
        console.log(error);
      });

  }

  public removeLike(username: String, tweetId: String) {
    this.setAuthHeader();
    this.client.put(this.baseUrl + username + '/remove-like/' + tweetId, {}, this.httpOptions).subscribe(result => {
      console.log(result)
    },
      error => {
        console.log(error);
      })

  }
}
