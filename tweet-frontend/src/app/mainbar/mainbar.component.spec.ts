import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersComponent } from '../users/users.component';
import { Location } from '@angular/common';

import { MainbarComponent } from './mainbar.component';
import { By } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';
import { TweetComponent } from '../tweet/tweet.component';

describe('MainbarComponent', () => {
  let component: MainbarComponent;
  let fixture: ComponentFixture<MainbarComponent>;
  let router: Router;
  let location: Location;
  let compiled:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainbarComponent,
        UsersComponent,
        LoginComponent ],
        imports: [RouterTestingModule.withRoutes([
          { path: 'users/:username', component: UsersComponent},
          {
            path: 'login', component: LoginComponent
          },
          { path: 'tweets/:username', component: TweetComponent }
        ])],
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    fixture = TestBed.createComponent(MainbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  
    compiled=fixture.debugElement.nativeElement;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('navigate to "search" takes you to /search', fakeAsync(() => {
    router.navigate(['../../users', 'sa']);
    tick();
    expect(location.path()).toBe('/users/sa');
  }));

  it('navigate to login ', fakeAsync(() => {
    compiled.querySelector('a.login').click();
    flush()
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
     expect(location.path()).toBe('/login');
    });
  }));

  it('navigate to tweets ', fakeAsync(() => {
    compiled.querySelector('a.all-tweets').click();
    flush()
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
     expect(location.path()).toBe('/tweets/all');
    });
  }));

  it('navigate to tweets ', fakeAsync(() => {
    compiled.querySelector('a.all-users').click();
    flush()
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
     expect(location.path()).toBe('/users/all');
    });
  }));
});
