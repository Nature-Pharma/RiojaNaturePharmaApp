import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent),
    title: 'Iniciar sesión | Nature-Pharma',
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
