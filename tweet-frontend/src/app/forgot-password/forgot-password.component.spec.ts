import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from '../Services/user.service';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let userServiceSpy=jasmine.createSpyObj('UserService',['forgotPassword']);
  userServiceSpy.forgotPassword.and.returnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      providers: [ HttpClientModule,
      {
        provide:UserService,
        useValue:userServiceSpy
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow user to submit form', () => {
    component.forgotPassForm.setValue({
      username: 'sasha',
      password: 'qwe',
      questions: 'What is the name of your first school?',
      answer: 'dsps',
    });
    expect(component.forgotPassForm.valid).toEqual(true);
    component.onSubmit();
    expect(userServiceSpy.forgotPassword).toHaveBeenCalled();
  });

  it('should require valid form details', () => {
    component.forgotPassForm.setValue({
      username: 'sasha',
      password: null,
      questions: 'What is the name of your first school?',
      answer: 'dsps',
    });
    expect(component.forgotPassForm.valid).toEqual(false);
  });


});
