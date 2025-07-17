import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Recover } from './components/recover/recover';
import { Register } from './components/register/register';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Shop } from './components/shop/shop';
import { authGuard } from './guards/auth-guard';
import { AdminPanel } from './components/admin-panel/admin-panel';

export const routes: Routes = [

    {path: 'home', title: 'Home', component: Home},
    {path: 'login', title: 'Login', component: Login},
    {path: 'recover', title: 'Recover', component: Recover},
    {path: 'register', title: 'Register', component: Register},
    {path: 'admin-panel', title: 'Administrador', component:AdminPanel},
    {path: 'shop', title:'Shop', component: Shop, canActivate:[authGuard]},//aqui protejo esta ruta privada
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', title: '404 |Page Not Found', component: PageNotFound}
];
