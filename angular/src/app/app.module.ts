import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './navpages/auth/auth.component';
import { Page0Component } from './navpages/page0/page0.component';
import { Page1Component } from './navpages/page1/page1.component';
import { MainComponent } from './navpages/main/main.component';
import { SearchComponent } from './navpages/search/search.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    Page0Component,
    Page1Component,
    MainComponent,
    SearchComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
