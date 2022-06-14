import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTweetsComponent } from './all-tweets/all-tweets.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { TweetComponent } from './tweet/tweet.component';

const routes: Routes = [{
  path: 'login', component: LoginComponent
},
{
  path: 'home/:username', component: HomeComponent,
  children: [
      { path: 'user-tweets/:username', component: TweetComponent }]
  },
  { path: 'all-tweets', component: AllTweetsComponent},
  { path: 'all-users', component: AllUsersComponent},
  { path: 'search-users', component: SearchUserComponent},
// {
//   // path: 'user-tweets/:username', component: TweetComponent
// },
{path: '', redirectTo: '/login',pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
