import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  username:String;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.username='sa';
    this.searchUser();
  }

  searchUser(){
    this.userService.searchUsers(this.username).subscribe(result=>{
      console.log(result);
    },
    error=>{
      console.log(error);
    })
  }

}
