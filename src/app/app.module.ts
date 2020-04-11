import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { JwtInterceptor } from './helper/jwt.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/common/login/login.component';
import {ToastContainerComponent} from './components/common/toast-container/toast-container.component';
import {HomeComponent} from './components/content/home/home.component';
import {UserSearchComponent} from './components/common/user-search/user-search.component';
import {SearchComponent} from './components/common/search/search.component';
import {HeaderComponent} from './components/layout/header/header.component';
import { SidebarComponent } from './components/Layout/sidebar/sidebar.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ViewComponent } from './components/content/view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ToastContainerComponent,
    UserSearchComponent,
    SearchComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    NavbarComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
