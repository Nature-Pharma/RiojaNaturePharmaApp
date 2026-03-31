import { Routes } from '@angular/router';
export const LOGISTICA_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./logistica.component').then(m => m.LogisticaComponent), title: 'Logística | Nature-Pharma' },
];
