import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminArticlesComponent } from './components/adminArticles/admin-articles.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArticleComponent } from './components/article/article.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path:'', component: ArticleComponent},
  {path: 'create', component: CreateComponent, canActivate:[AdminGuard]},
  {path: 'edit/:id', component: EditComponent, canActivate:[AdminGuard]},
  {path: 'admin', component: AdminArticlesComponent, canActivate:[AdminGuard]},
  {path: 'articles', component: ArticlesComponent},
  {path: '', redirectTo: 'articles', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'article/:id', component: ArticleComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }