import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserResponse } from '../model/UserResponse';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

username:String;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router:Router) { }

  users;
  subscribe: Subscription;

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')
    if(this.username=='all'){
      this.userService.getAllUsers().subscribe(result=>{
        this.mapUsers(result.data);
        //this.users.avtar= '/assets/'+this.users.avtar+'.png'
      },
      error=>{
        console.log(error.error);
        console.log(error.error.error);
        if(error.error.error='JWT Token is Not Valid'){
          this.router.navigate(['/login']);
        }
      })
    }
    else{
      this.userService.searchUsers(this.username).subscribe(result=>{
        this.mapUsers(result.data);
      },
      error=>{
        console.log(error.error.error);
        if(error.error.error='JWT Token is Not Valid'){
          this.router.navigate(['/login']);
        }
        
      }
      )
    }
    
  }

  mapUsers(data){
    this.users=data.map(ele=>{
      return{
        ...ele,
      avtar:'/assets/' + ele.avtar + '.png'
      }
    })

  }

  ngOndestroy() {
    this.subscribe.unsubscribe;
  }

}
