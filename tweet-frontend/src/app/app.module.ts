import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainbarComponent } from './mainbar/mainbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TweetComponent } from './tweet/tweet.component';
import { HomeComponent } from './home/home.component';
import { CreateTweetComponent } from './create-tweet/create-tweet.component';
// import { AllTweetsComponent } from './all-tweets/all-tweets.component';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ModelPopupComponent } from './model-popup/model-popup.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainbarComponent,
    TweetComponent,
    HomeComponent,
    CreateTweetComponent,
    // AllTweetsComponent,
    UsersComponent,
    RegisterUserComponent,
    ForgotPasswordComponent,
    ModelPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
