import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from '../Services/user.service';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userServiceSpy=jasmine.createSpyObj('UserService',['getAllUsers','searchUsers']);
  userServiceSpy.getAllUsers.and.returnValue(of());
  userServiceSpy.searchUsers.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [RouterTestingModule],
      providers: [
        {
          provide:UserService,
          useValue:userServiceSpy
        }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should show all users on screen', () => {
  //   component.username='all';
  //   //userServiceSpy.getAllUsers.and.returnValue(of());
  //   expect(userServiceSpy.getAllUsers).toHaveBeenCalled();
  // });

  it('should show searched users on screen', () => {
    component.username='search';
    userServiceSpy.searchUsers.and.returnValue(of());
    expect(userServiceSpy.searchUsers).toHaveBeenCalled();
  });
});
