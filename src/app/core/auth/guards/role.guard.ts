import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Department, Role } from '../models/user.model';
import { AuthService } from '../services/auth.service';

// Route data interface for type-safety
export interface RouteRoleData {
  roles?: Role[];
  departments?: Department[];
}

// Functional guard — checks user role and/or department against route.data
// Routes must provide: data: { roles?: Role[], departments?: Department[] }
// Access is granted if the user matches ANY of the specified roles OR departments
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router      = inject(Router);

  const { roles = [], departments = [] } = route.data as RouteRoleData;

  // Admin bypasses all role/department restrictions
  if (authService.isAdmin()) {
    return true;
  }

  const hasRequiredRole = roles.length > 0 && authService.hasAnyRole(roles);
  const hasRequiredDept = departments.length > 0 && authService.hasAnyDepartment(departments);

  if (hasRequiredRole || hasRequiredDept) {
    return true;
  }

  // Redirect unauthorized users to dashboard
  return router.createUrlTree(['/dashboard']);
};
