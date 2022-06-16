import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { RegisterUser } from '../model/RegisterUser';


export interface Login {
  loginId: String;
  password: String;
}
export interface LoginResult {
  loginId: String;
  roles: [];
  token: String
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient,) { }
  token: String;
  private authUrl = 'http://localhost:8082/api/v1.0/tweets/';
  private baseUrl='http://localhost:9090/api/v1.0/tweets/';
  isSuccess: Boolean;
  error:String;
  httpOptions: Object;
  // = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.token}`
  //     }),
  //     responseType: 'json'
  //   }

  setAuthHeader(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }),
      responseType: 'json'
    }
  }

  public login(username: String, password: String):Subject<boolean> {
    let login: Login = {
      loginId: username,
      password: password
    }
    var subject=new Subject<boolean>();

     this.client.post<LoginResult>(this.authUrl + 'login', login).subscribe(result => {
      localStorage.clear();
      this.token = result.token
      console.log(this.token);
      localStorage.setItem('token',""+this.token);
      subject.next(true);
    },
      (error) => {
        console.log(error.error.message);
        this.error=error.error.message;
        subject.next(false);
      }
      )
    
    return subject;
  }
  
  registerUser(registerRequest:RegisterUser){
    return this.client.post(this.authUrl+'register', registerRequest);

  }

  forgotPassword(forgotPasswordRequest,username){
    console.log(forgotPasswordRequest);
    return this.client.post(this.authUrl+username+'/forgot', forgotPasswordRequest);

  }
  getUser(username:String){
    this.setAuthHeader();
   return this.client.get<ApiResponse>(this.baseUrl+'user/'+username, this.httpOptions);
  }

  getAllUsers(){
    this.setAuthHeader();
    return this.client.get<ApiResponse>(this.baseUrl+'user/all', this.httpOptions);
   }

   searchUsers(username:String){
    this.setAuthHeader();
    return this.client.get<ApiResponse>(this.baseUrl+'user/search/'+username, this.httpOptions);
   }

}
