import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../model/UserResponse';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  users;

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(result=>{
      this.mapUsers(result.data);
      //this.users.avtar= '/assets/'+this.users.avtar+'.png'
    },
    error=>{
      console.log(error);
    })
  }

  mapUsers(data){
    this.users=data.map(ele=>{
      return{
        ...ele,
      avtar:'/assets/' + ele.avtar + '.png'
      }
    })

  }

}
