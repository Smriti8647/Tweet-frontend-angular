import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTweetsComponent } from './all-tweets/all-tweets.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { TweetComponent } from './tweet/tweet.component';

const routes: Routes = [{
  path: 'login', component: LoginComponent
},
{
  path: 'home/:username', component: HomeComponent,
  children: [
      ]
  },
  { path: 'tweets/:username', component: TweetComponent },
  { path: 'all-tweets', component: AllTweetsComponent},
  { path: 'register-user', component: RegisterUserComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
// {
//   // path: 'user-tweets/:username', component: TweetComponent
// },
{path: '', redirectTo: '/login',pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
