import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserService } from '../Services/user.service';

import { RegisterUserComponent } from './register-user.component';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let userServiceSpy=jasmine.createSpyObj('UserService',['registerUser']);
  userServiceSpy.registerUser.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ],
      imports:[ ReactiveFormsModule],
      providers: [
        {
          provide:UserService,
          useValue:userServiceSpy
        }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid email', () => {
    component.profileForm.setValue({
      username: 'sasha',
      firstName:'Sasha',
      lastName: 'Harris',
      emailId: 'invalidemail',
      password: 'qwe',
      confirmPassword: 'qwe',
      contactNumber: '9876543210',
      questions: 'question',
      avtar: 'avtar1',
      answer: 'ans',
    });
    expect(component.profileForm.valid).toEqual(false);
  });
  it('should require valid contact number', () => {
    component.profileForm.setValue({
      username: 'sasha',
      firstName:'Sasha',
      lastName: 'Harris',
      emailId: 'invalidemail',
      password: 'qwe',
      confirmPassword: 'qwe',
      contactNumber: '123',
      questions: 'question',
      avtar: 'avtar1',
      answer: 'ans',
    });
    expect(component.profileForm.valid).toEqual(false);
  });

  

  it('should be valid if form value is valid', () => {
    component.profileForm.setValue({
      username: 'sasha',
      firstName:'Sasha',
      lastName: 'Harris',
      emailId: 'valid@email.com',
      password: 'qwe',
      confirmPassword: 'qwe',
      contactNumber: '9876543210',
      questions: 'question',
      avtar: 'avtar1',
      answer: 'ans',
    });
    expect(component.profileForm.valid).toEqual(true);
  });

  it('should allow user to register', () => {
    const formData = {
      username: 'sasha',
      firstName:'Sasha',
      lastName: 'Harris',
      emailId: 'valid@email.com',
      password: 'qwe',
      confirmPassword: 'qwe',
      contactNumber: '9876543210',
      questions: 'question',
      avtar: 'avtar1',
      answer: 'ans',
    };
    component.profileForm.setValue(formData);
    component.onSubmit();
    expect(userServiceSpy.registerUser).toHaveBeenCalled();
  })

  


});


