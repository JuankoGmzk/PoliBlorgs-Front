import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewsComponent } from './components/add-news/add-news.component';
import {NewsComponent} from './components/news/news.component';
import {UsersComponent} from './components/users/users.component';
import {LoginComponent} from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'list', component: NewsComponent },
  { path: 'add', component: AddNewsComponent },
  { path: 'user', component:UsersComponent },
  { path: 'login', component:LoginComponent },
  { path: 'navbar', component: NavbarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
