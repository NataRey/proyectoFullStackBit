import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { PageNotFound } from './components/page-not-found/page-not-found';

export const routes: Routes = [

    {path: 'home', title: 'Home', component: Home},
    {path: 'login', title: 'Login', component: Login},
    {path: 'register', title: 'Register', component: Register},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', title: '404 |Page Not Found', component: PageNotFound}
];
