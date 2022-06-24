import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tweet } from '../model/Tweet';
import { TweetService } from '../Services/tweet.service';

@Component({
  selector: 'app-model-popup',
  templateUrl: './model-popup.component.html',
  styleUrls: ['./model-popup.component.scss']
})
export class ModelPopupComponent implements OnInit {
  updateMessage: any;

  constructor(private tweetService:TweetService) { }

  ngOnInit(): void {
  }

  elementRefHolder:ElementRef;
  @ViewChild('myModal', {static: false}) modal: ElementRef;

  @ViewChild('updateModal', {static: false}) updateModal: ElementRef;
tweet:Tweet;

  open(any:String,tweet?:Tweet) {
    console.log(any)
    if(any==='update'){
this.tweet=tweet;
this.updateMessage=tweet.message;
      this.elementRefHolder = this.updateModal;
    this.updateModal.nativeElement.style.display = 'block';

    } else{
      this.elementRefHolder = this.modal;
    this.modal.nativeElement.style.display = 'block';
    }
  }

  close() {
    this.elementRefHolder.nativeElement.style.display = 'none';
   
  }

updateTweet(){
  this.tweetService.updateTweet(this.tweet.loginId,this.tweet.id,this.updateMessage).add(()=>{
   this.tweet=null;
   this.updateMessage=null;
    window.location.reload();
  });
}

}
