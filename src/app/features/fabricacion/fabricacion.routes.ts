import { Routes } from '@angular/router';

export const FABRICACION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./fabricacion.component').then(m => m.FabricacionComponent),
    title: 'Fabricación | Nature-Pharma',
  },
];
