import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { UserService } from '../Services/user.service';
import { Location } from '@angular/common';

import { UsersComponent } from './users.component';
import { LoginComponent } from '../login/login.component';
var userMockData: ApiResponse =
  { "success": true, 
  "data":
   [{ "avtar": "avtar1", 
   "loginId": "sam",
    "name": "sam harris" },
   { "avtar": "avtar1",
    "loginId": "sasha", 
    "name": "sam harris" }, 
   { "avtar": "avtar1",
    "loginId": "in28minutes", 
    "name": "Smriti Arora" }, 
   { "avtar": "avtar3",
    "loginId": "sameer",
     "name": "Sam Harris" },  
    ], "error": null }

    var mockJWTError:ApiResponse=
    {"success":false,"data":null,"error":"JWT Token is Not Valid"}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUsers', 'searchUsers']);
  let activatedRouteSpy = {
    snapshot: {
      paramMap: convertToParamMap({
        username: 'all'
      })
    }
  };
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent,
        LoginComponent],
      imports: [RouterTestingModule.withRoutes([
        {
          path: 'login', component: LoginComponent
        }
      ])],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userServiceSpy.getAllUsers.and.returnValue(of());
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all users on screen', () => {
    //component.username = 'all';
    userServiceSpy.getAllUsers.and.returnValue(of(userMockData));
    expect(userServiceSpy.getAllUsers).toHaveBeenCalled();
  });

  it('should navigate to login page in case of JWT error', () => {
    //component.username = 'all';
    userServiceSpy.getAllUsers.and.returnValue(of(mockJWTError));
    expect(userServiceSpy.getAllUsers).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/login');
     });
  });

});

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUsers', 'searchUsers']);
  let activatedRouteSpy = {
    snapshot: {
      paramMap: convertToParamMap({
        username: 'search'
      })
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: UserService,
          useValue: userServiceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userServiceSpy.searchUsers.and.returnValue(of(userMockData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show searched users on screen', () => {
    component.username = 'search';

    expect(userServiceSpy.searchUsers).toHaveBeenCalled();
  });
});
