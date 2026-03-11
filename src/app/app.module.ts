import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioFormComponent } from './Components/usuario-form/usuario-form.component';
import { LoginComponent } from './Components/login/login.component';
import { authInterceptor } from './Service/auth.interceptor';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { UsuarioDetailsComponent } from './Components/usuario-details/usuario-details.component';
import { RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './Components/access-denied/access-denied.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    LoginComponent,
    NavbarComponent,
    UsuarioDetailsComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    // Interceptor
    { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
