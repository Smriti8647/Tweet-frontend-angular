import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TweetService } from '../Services/tweet.service';

import { CreateTweetComponent } from './create-tweet.component';

describe('CreateTweetComponent', () => {
  let component: CreateTweetComponent;
  let fixture: ComponentFixture<CreateTweetComponent>;
  let tweetServiceSpy=jasmine.createSpyObj('TweetService',['createTweet']);
  tweetServiceSpy.createTweet.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTweetComponent ],
      imports: [RouterTestingModule,ReactiveFormsModule],
      providers: [
        {
          provide:TweetService,
          useValue:tweetServiceSpy
        }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the service if form value is valid', () => {
    component.form.setValue({
      message:'hey',
      tags:[{tagValue:'sasha'}]
    });
    expect(component.form.valid).toEqual(true);
    component.createTweet();
    expect(tweetServiceSpy.createTweet).toHaveBeenCalled();
  });
});
