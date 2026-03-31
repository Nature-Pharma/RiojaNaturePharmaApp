import { Routes } from '@angular/router';
export const RRHH_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./rrhh.component').then(m => m.RrhhComponent), title: 'RRHH | Nature-Pharma' },
];
