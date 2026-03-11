import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { UsuarioFormComponent } from './Components/usuario-form/usuario-form.component';
import { authGuard } from './Guards/auth.guard';
import { LoginComponent } from './Components/login/login.component';
import { UsuarioDetailsComponent } from './Components/usuario-details/usuario-details.component';
import { AccessDeniedComponent } from './Components/access-denied/access-denied.component';
import { functionalGuard } from './Guards/functional.guard';

const routes: Routes = [
  { path: 'usuario', component: UsuarioFormComponent, canActivate: [authGuard, functionalGuard] }, //Crear usaurio
  { path: 'usuario/:id', component: UsuarioFormComponent, canActivate: [authGuard] }, //Editar usuario
  { path: 'myAccount', component: UsuarioDetailsComponent}, // Vista del usaurio individual
  { path: 'login', component: LoginComponent }, // Login
  { path: 'usuarios', component: UsuarioComponent, canActivate: [authGuard, functionalGuard] }, // Lista de usuarios
  { path: '403', component: AccessDeniedComponent}, // Prohibicion
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
