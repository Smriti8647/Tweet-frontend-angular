import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.scss']
})
export class MainbarComponent implements OnInit {

  @Output() mainbarEvent = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<string>()
  search=new FormControl();
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
    this.onClick('search');
    console.log(this.search.value);
    this.searchEvent.emit(''+this.search.value);
  }

  onLogout(){
    localStorage.clear();
  }

}
