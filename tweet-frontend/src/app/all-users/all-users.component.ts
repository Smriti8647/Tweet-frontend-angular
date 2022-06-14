import { Component, OnInit } from '@angular/core';
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
      this.users=result.data;
    },
    error=>{
      console.log(error);
    })
  }

}
