import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mainbar',
  templateUrl: './mainbar.component.html',
  styleUrls: ['./mainbar.component.scss']
})
export class MainbarComponent implements OnInit {

  @Output() mainbarEvent = new EventEmitter<string>();
  constructor() { }

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

}
