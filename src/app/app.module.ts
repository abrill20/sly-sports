import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule } from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

//COMPONTENTS
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
//SERVICES
import { AdminService } from './services/admin.service';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { ArticleService } from './services/article.service';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { routes } from './app-routing.module';
import { RouterModule } from '@angular/router';

export function tokenGetter() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userToken = user ? localStorage.getItem('id_token') : null;
  return userToken;
}

@NgModule({
  declarations: [
    AppComponent,
    AdminArticlesComponent,
    CreateComponent,
    EditComponent,
    ArticlesComponent,
    AboutComponent,
    NavbarComponent,
    ArticleComponent,
    FooterComponent,
    ContactComponent,
    RegisterComponent,
    ProfileComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule,
    MDBBootstrapModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200', 'https://sly-sports.herokuapp.com/']
      }
    }),
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [AdminService, ValidateService, AuthService, AuthGuard, ArticleService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
