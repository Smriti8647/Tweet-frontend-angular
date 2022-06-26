import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TagRequest } from '../model/TagRequest';
import { TweetService } from '../Services/tweet.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss']
})
export class CreateTweetComponent implements OnInit {

  @Input() username:String;
  //message:String;
  form:FormGroup;
  tagRequest:TagRequest;
  taggedUsers:String[];
  

  constructor(private service:TweetService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taggedUsers=[];
    this.form=this.fb.group({
      message:new FormControl,
      tags:this.fb.array([])
    })
    this.addTags();
  }


  createTweet(){
    console.log(this.form.value);
    console.log(this.form.controls['tags'].value.length);
    for(let i=0;i<this.form.controls['tags'].value.length;i++){
      this.taggedUsers.push(this.form.controls['tags'].value[i].tagValue);
    }
    console.log(this.taggedUsers);
    this.tagRequest={
      tweetId:'',
      users: this.taggedUsers
    }
    console.log(this.tagRequest);
    this.service.createTweet(this.username,this.form.controls['message'].value,this.tagRequest);
  }

  getTags(): FormArray{
   return this.form.get('tags') as FormArray;
  }

  addTags(){
    this.getTags().push(this.fb.group({tagValue:""}))

  }

  removeTag(i){
    this.getTags().removeAt(i);
  }

}
