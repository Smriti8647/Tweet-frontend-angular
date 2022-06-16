import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../Services/user.service';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let userServiceSpy=jasmine.createSpyObj('UserService',['forgotPassword']);

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
});
