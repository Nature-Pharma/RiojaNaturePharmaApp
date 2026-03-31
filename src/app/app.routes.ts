import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { roleGuard } from './core/auth/guards/role.guard';
import { Department, Role } from './core/auth/models/user.model';

export const routes: Routes = [
  // ── Public routes ──────────────────────────────────────────────
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },

  // ── Protected routes (behind Layout shell) ─────────────────────
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
      },

      {
        path: 'fabricacion',
        canActivate: [roleGuard],
        data: { roles: [Role.ADMIN], departments: [Department.FABRICACION] },
        loadChildren: () =>
          import('./features/fabricacion/fabricacion.routes').then(m => m.FABRICACION_ROUTES),
      },

      {
        path: 'logistica',
        canActivate: [roleGuard],
        data: { roles: [Role.ADMIN], departments: [Department.LOGISTICA] },
        loadChildren: () =>
          import('./features/logistica/logistica.routes').then(m => m.LOGISTICA_ROUTES),
      },

      {
        path: 'rrhh',
        canActivate: [roleGuard],
        data: { roles: [Role.ADMIN], departments: [Department.RRHH] },
        loadChildren: () =>
          import('./features/rrhh/rrhh.routes').then(m => m.RRHH_ROUTES),
      },

      {
        path: 'mantenimiento',
        canActivate: [roleGuard],
        data: { roles: [Role.ADMIN], departments: [Department.MANTENIMIENTO] },
        loadChildren: () =>
          import('./features/mantenimiento/mantenimiento.routes').then(m => m.MANTENIMIENTO_ROUTES),
      },
    ],
  },

  // ── Fallback ───────────────────────────────────────────────────
  { path: '**', redirectTo: 'auth/login' },
];
