import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }

   username:String;

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.userService.getUser(this.username).subscribe((user)=>{
      localStorage.setItem('avtar',user.data['avtar']);
      localStorage.setItem('userName',user.data['name']);
      localStorage.setItem('loginId',user.data['loginId']);
    });
  }

  getItem(item: string){
    if(item=='avtar')
    return '/assets/'+localStorage.getItem(item)+'.png';
    return localStorage.getItem(item);
  }
}
