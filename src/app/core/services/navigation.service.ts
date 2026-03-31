import { Injectable, computed, inject } from '@angular/core';
import { Department, Role } from '../auth/models/user.model';
import { AuthService } from '../auth/services/auth.service';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  requiredRoles?: Role[];
  requiredDepartments?: Department[];
}

// All possible navigation items — add new features here (Open/Closed principle)
const ALL_NAV_ITEMS: NavItem[] = [
  {
    label: 'Inicio',
    icon: 'dashboard',
    route: '/dashboard',
    // accessible by everyone authenticated
  },
  {
    label: 'Fabricación',
    icon: 'precision_manufacturing',
    route: '/fabricacion',
    requiredRoles: [Role.ADMIN],
    requiredDepartments: [Department.FABRICACION],
  },
  {
    label: 'Logística',
    icon: 'local_shipping',
    route: '/logistica',
    requiredRoles: [Role.ADMIN],
    requiredDepartments: [Department.LOGISTICA],
  },
  {
    label: 'RRHH',
    icon: 'people',
    route: '/rrhh',
    requiredRoles: [Role.ADMIN],
    requiredDepartments: [Department.RRHH],
  },
  {
    label: 'Mantenimiento',
    icon: 'build',
    route: '/mantenimiento',
    requiredRoles: [Role.ADMIN],
    requiredDepartments: [Department.MANTENIMIENTO],
  },
];

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly authService = inject(AuthService);

  // Computed signal — reacts automatically to auth state changes
  readonly visibleNavItems = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return [];

    return ALL_NAV_ITEMS.filter(item => {
      // Items without role/dept restrictions are visible to all
      if (!item.requiredRoles?.length && !item.requiredDepartments?.length) {
        return true;
      }

      // Admin sees everything
      if (user.role === Role.ADMIN) return true;

      // User role: check role OR department match
      const roleMatch = item.requiredRoles?.includes(user.role) ?? false;
      const deptMatch = item.requiredDepartments?.includes(user.department) ?? false;
      return roleMatch || deptMatch;
    });
  });
}
