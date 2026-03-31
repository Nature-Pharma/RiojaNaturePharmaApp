// ============================================================
// Nature-Pharma User Domain Models
// ============================================================

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export enum Department {
  FABRICACION = 'fabricacion',
  LOGISTICA = 'logistica',
  RRHH = 'rrhh',
  MANTENIMIENTO = 'mantenimiento',
  DIRECCION = 'direccion',
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  role: Role;
  avatar?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
