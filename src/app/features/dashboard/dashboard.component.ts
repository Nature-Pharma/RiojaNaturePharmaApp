import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from '../../core/auth/services/auth.service';
import { DashboardApiService } from './services/dashboard-api.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Department } from '../../core/auth/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTooltipModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  readonly authService      = inject(AuthService);
  readonly dashboardService = inject(DashboardApiService);

  readonly currentUser = this.authService.currentUser;
  readonly loading     = this.dashboardService.loading;
  readonly dashData    = this.dashboardService.data;

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 20) return 'Buenas tardes';
    return 'Buenas noches';
  }

  get departmentLabel(): string {
    const labels: Record<Department, string> = {
      fabricacion: 'Fabricación',
      logistica: 'Logística',
      rrhh: 'RRHH',
      mantenimiento: 'Mantenimiento',
      direccion: 'Dirección',
    };
    return labels[this.currentUser()?.department ?? Department.DIRECCION] ?? '';
  }

  get breadcrumbs() {
    return [{ label: 'Inicio' }];
  }

  ngOnInit(): void {
    this.dashboardService.loadDashboard(
      this.currentUser()?.department ?? Department.DIRECCION
    );
  }

  refresh(): void {
    this.dashboardService.loadDashboard(
      this.currentUser()?.department ?? Department.DIRECCION
    );
  }

  getTrendIcon(trend?: 'up' | 'down' | 'neutral'): string {
    return trend === 'up' ? 'trending_up' : trend === 'down' ? 'trending_down' : 'trending_flat';
  }

  getTrendClass(trend?: 'up' | 'down' | 'neutral'): string {
    return trend === 'up' ? 'trend--up' : trend === 'down' ? 'trend--down' : 'trend--neutral';
  }
}
