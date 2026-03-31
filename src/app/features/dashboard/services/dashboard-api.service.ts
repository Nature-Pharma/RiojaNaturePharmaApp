import { Injectable, inject, signal } from '@angular/core';
import { delay, of } from 'rxjs';
import { Department } from '../../../core/auth/models/user.model';

export interface StatCard {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

export interface DashboardData {
  statsCards: StatCard[];
  lastUpdated: Date;
}

const MOCK_DATA: Record<Department, DashboardData> = {
  [Department.DIRECCION]: {
    lastUpdated: new Date(),
    statsCards: [
      { title: 'Producción del día', value: '1.240 kg', subtitle: 'Fabricación', icon: 'precision_manufacturing', trend: 'up', trendValue: '+8%', color: 'primary' },
      { title: 'Pedidos en tránsito', value: 34, subtitle: 'Logística', icon: 'local_shipping', trend: 'neutral', trendValue: '=', color: 'info' },
      { title: 'Empleados activos', value: 127, subtitle: 'RRHH', icon: 'people', trend: 'up', trendValue: '+2', color: 'success' },
      { title: 'Órdenes de trabajo', value: 8, subtitle: 'Mantenimiento', icon: 'build', trend: 'down', trendValue: '-3', color: 'warning' },
      { title: 'Incidencias abiertas', value: 3, subtitle: 'Todas las áreas', icon: 'warning_amber', trend: 'down', trendValue: '-2', color: 'error' },
      { title: 'Eficiencia global', value: '94,2%', subtitle: 'Últimas 24h', icon: 'speed', trend: 'up', trendValue: '+1.3%', color: 'success' },
    ],
  },
  [Department.FABRICACION]: {
    lastUpdated: new Date(),
    statsCards: [
      { title: 'Producción del día', value: '1.240 kg', subtitle: 'Objetivo: 1.200 kg', icon: 'precision_manufacturing', trend: 'up', trendValue: '+3.3%', color: 'primary' },
      { title: 'Lotes en proceso', value: 7, subtitle: 'Líneas activas', icon: 'view_timeline', trend: 'neutral', color: 'info' },
      { title: 'Controles de calidad', value: 12, subtitle: 'Aprobados hoy', icon: 'verified', trend: 'up', trendValue: '100%', color: 'success' },
      { title: 'Tiempo de ciclo', value: '4,2h', subtitle: 'Promedio por lote', icon: 'timer', trend: 'down', trendValue: '-0.3h', color: 'success' },
    ],
  },
  [Department.LOGISTICA]: {
    lastUpdated: new Date(),
    statsCards: [
      { title: 'Pedidos en tránsito', value: 34, subtitle: 'Actualizados hace 5 min', icon: 'local_shipping', trend: 'neutral', color: 'info' },
      { title: 'Recepciones hoy', value: 8, subtitle: 'Completadas', icon: 'inventory', trend: 'up', trendValue: '+2', color: 'success' },
      { title: 'Stock crítico', value: 3, subtitle: 'Productos bajo mínimo', icon: 'inventory_2', trend: 'up', trendValue: '+1', color: 'error' },
      { title: 'Tiempo medio entrega', value: '2,4 días', subtitle: 'Última semana', icon: 'schedule', trend: 'down', trendValue: '-0.2 días', color: 'success' },
    ],
  },
  [Department.RRHH]: {
    lastUpdated: new Date(),
    statsCards: [
      { title: 'Empleados activos', value: 127, subtitle: 'Total plantilla', icon: 'people', color: 'primary' },
      { title: 'Ausencias hoy', value: 4, subtitle: 'Justificadas: 3', icon: 'event_busy', trend: 'neutral', color: 'warning' },
      { title: 'Solicitudes pendientes', value: 6, subtitle: 'Vacaciones y permisos', icon: 'pending_actions', trend: 'down', trendValue: '-2', color: 'info' },
      { title: 'Turnos cubiertos', value: '98%', subtitle: 'Semana actual', icon: 'schedule', trend: 'up', trendValue: '+2%', color: 'success' },
    ],
  },
  [Department.MANTENIMIENTO]: {
    lastUpdated: new Date(),
    statsCards: [
      { title: 'Órdenes abiertas', value: 8, subtitle: 'Pendientes de resolución', icon: 'build_circle', trend: 'down', trendValue: '-3', color: 'warning' },
      { title: 'Equipos operativos', value: '94%', subtitle: 'Disponibilidad', icon: 'precision_manufacturing', trend: 'up', trendValue: '+1%', color: 'success' },
      { title: 'Mant. preventivo', value: 3, subtitle: 'Esta semana', icon: 'build', color: 'info' },
      { title: 'Tiempo medio resolución', value: '3,1h', subtitle: 'Últimos 30 días', icon: 'timer', trend: 'down', trendValue: '-0.5h', color: 'success' },
    ],
  },
};

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private readonly _data    = signal<DashboardData | null>(null);
  private readonly _loading = signal(false);

  readonly data    = this._data.asReadonly();
  readonly loading = this._loading.asReadonly();

  loadDashboard(department: Department): void {
    this._loading.set(true);
    const mockData = MOCK_DATA[department] ?? MOCK_DATA[Department.DIRECCION];

    of(mockData).pipe(delay(600)).subscribe(data => {
      this._data.set(data);
      this._loading.set(false);
    });
  }
}
