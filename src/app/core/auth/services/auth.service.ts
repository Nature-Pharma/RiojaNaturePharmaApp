import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, delay, of, throwError } from 'rxjs';
import { Department, LoginCredentials, Role, User } from '../models/user.model';

// ============================================================
// Mock Users — replace with real API when backend is ready
// ============================================================
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    firstName: 'Carlos',
    lastName: 'García',
    email: 'admin@naturepharma.es',
    department: Department.DIRECCION,
    role: Role.ADMIN,
  },
  {
    id: 2,
    username: 'fabricacion',
    password: 'fab123',
    firstName: 'María',
    lastName: 'López',
    email: 'fabricacion@naturepharma.es',
    department: Department.FABRICACION,
    role: Role.USER,
  },
  {
    id: 3,
    username: 'logistica',
    password: 'log123',
    firstName: 'Juan',
    lastName: 'Martínez',
    email: 'logistica@naturepharma.es',
    department: Department.LOGISTICA,
    role: Role.USER,
  },
  {
    id: 4,
    username: 'rrhh',
    password: 'rrhh123',
    firstName: 'Ana',
    lastName: 'Sánchez',
    email: 'rrhh@naturepharma.es',
    department: Department.RRHH,
    role: Role.USER,
  },
  {
    id: 5,
    username: 'mantenimiento',
    password: 'mant123',
    firstName: 'Pedro',
    lastName: 'Ruiz',
    email: 'mantenimiento@naturepharma.es',
    department: Department.MANTENIMIENTO,
    role: Role.USER,
  },
];

const STORAGE_KEY_TOKEN = 'np_token';
const STORAGE_KEY_USER  = 'np_user';

// ============================================================
// AuthService — manages authentication state with signals
// ============================================================
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  // Internal writable signals
  private readonly _user  = signal<User | null>(this.restoreUser());
  private readonly _token = signal<string | null>(localStorage.getItem(STORAGE_KEY_TOKEN));

  // Public readonly signals
  readonly currentUser    = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null && this._token() !== null);

  // ---------------------------------------------------------------
  // login — validates credentials against mock data
  // Returns an Observable to allow real HTTP swapping later
  // ---------------------------------------------------------------
  login(credentials: LoginCredentials): Observable<User> {
    const found = MOCK_USERS.find(
      u => u.username === credentials.username && u.password === credentials.password
    );

    if (!found) {
      return throwError(() => new Error('Usuario o contraseña incorrectos'));
    }

    const { password: _, ...user } = found;
    const token = this.generateMockToken(user);

    this._user.set(user);
    this._token.set(token);
    localStorage.setItem(STORAGE_KEY_TOKEN, token);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));

    // Simulate network latency (500ms)
    return of(user).pipe(delay(500));
  }

  // ---------------------------------------------------------------
  // logout — clears state and navigates to login
  // ---------------------------------------------------------------
  logout(): void {
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
    this.router.navigate(['/auth/login']);
  }

  // ---------------------------------------------------------------
  // Role/permission helpers
  // ---------------------------------------------------------------
  hasRole(role: Role): boolean {
    return this._user()?.role === role;
  }

  hasAnyRole(roles: Role[]): boolean {
    const userRole = this._user()?.role;
    return userRole !== undefined && roles.includes(userRole);
  }

  hasDepartment(department: Department): boolean {
    return this._user()?.department === department;
  }

  hasAnyDepartment(departments: Department[]): boolean {
    const userDept = this._user()?.department;
    return userDept !== undefined && departments.includes(userDept);
  }

  isAdmin(): boolean {
    return this.hasRole(Role.ADMIN);
  }

  getToken(): string | null {
    return this._token();
  }

  // ---------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------
  private generateMockToken(user: User): string {
    const payload = btoa(JSON.stringify({ sub: user.id, role: user.role, iat: Date.now() }));
    return `mock.${payload}.signature`;
  }

  private restoreUser(): User | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}
