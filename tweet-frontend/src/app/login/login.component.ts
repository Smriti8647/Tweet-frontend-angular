import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  error: Boolean;
  errorMessage: String;
  loading: boolean
  subscribe: Subscription;

  constructor(private userService: UserService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.username = "";
    this.password = "";
    this.error = false;
    this.loading = false;
    console.log("initially username " + this.username)
    console.log("initially password " + this.password)
  }


  onSubmit() {
    this.userService.login(this.username, this.password).subscribe(result => {
      if (result === true) {
        this.router.navigate(['home', this.username]);
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
  ngOndestroy() {
    this.subscribe.unsubscribe;
  }
}
