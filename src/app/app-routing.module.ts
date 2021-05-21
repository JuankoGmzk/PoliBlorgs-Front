import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewsComponent } from './components/add-news/add-news.component';
import {NewsComponent} from './components/news/news.component'
import {UsersComponent} from './components/users/users.component'
//import { ListBookComponent } from './components/list-book/list-book.component';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'list', component: NewsComponent },
  { path: 'add', component: AddNewsComponent },
  { path: 'user', component:UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
