import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.scss']
})
export class MainbarComponent implements OnInit {

  @Output() mainbarEvent = new EventEmitter<string>();
  search:String;
  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  // onClick($event){
  //   console.log($event.target.value);
  //   //console.log(event.currentTarget);
  //   console.log($event.eventPhase);
  // }

  onClick(value:string){
    this.mainbarEvent.emit(value);
  }

  onSearch(){
    this.router.navigate(['../../users', this.search]);
  }

  onLogout(){
    localStorage.clear();
  }

}
