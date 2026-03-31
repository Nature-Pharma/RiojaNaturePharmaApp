import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  readonly authService = inject(AuthService);
  readonly currentUser = this.authService.currentUser;

  get userInitials(): string {
    const user = this.currentUser();
    if (!user) return '?';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }

  get userFullName(): string {
    const user = this.currentUser();
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  get departmentLabel(): string {
    const dept = this.currentUser()?.department;
    const labels: Record<string, string> = {
      fabricacion: 'Fabricación',
      logistica: 'Logística',
      rrhh: 'RRHH',
      mantenimiento: 'Mantenimiento',
      direccion: 'Dirección',
    };
    return dept ? labels[dept] ?? dept : '';
  }

  get roleLabel(): string {
    return this.currentUser()?.role === 'admin' ? 'Administrador' : 'Usuario';
  }

  logout(): void {
    this.authService.logout();
  }
}
