import { Routes } from '@angular/router';
export const MANTENIMIENTO_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./mantenimiento.component').then(m => m.MantenimientoComponent), title: 'Mantenimiento | Nature-Pharma' },
];
