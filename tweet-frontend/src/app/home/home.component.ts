import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

   username:String;
  ngOnInit(): void {
    
    this.username = this.route.snapshot.paramMap.get('username');
    console.log(this.username);
  }

}
