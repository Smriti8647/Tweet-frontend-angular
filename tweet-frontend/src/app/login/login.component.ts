import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //username: string;
  //password: string;
  error: Boolean;
  errorMessage: String;
  loading: boolean
  subscribe: Subscription;

  username= new FormControl('', Validators.required);
      password= new FormControl('', Validators.required);

  constructor(private userService: UserService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.error = false;
    this.loading = false;
    console.log("initially username " + this.username)
    console.log("initially password " + this.password)
  }


  onSubmit() {
    console.log(" username " + this.username.value)
    this.userService.login(this.username.value, this.password.value).subscribe(result => {
      if (result === true) {
        console.log('result true');
        this.router.navigate(['home', this.username.value]);
      }
      else {
        this.error = true;
        if (this.userService.error != null && this.userService.error == 'UserCredential is not authorized....')
          this.errorMessage = 'Invalid username or password'
        else
          this.errorMessage = 'System Error';
      }
    })

  }

  forgotPass(){
    this.router.navigate(['forgot-password']);

  }
  ngOndestroy() {
    this.subscribe.unsubscribe;
  }
}
