import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { MantenimientoApiService } from './services/mantenimiento-api.service';
import { EstadoOrdenTrabajo, PrioridadOrden } from './models/mantenimiento.model';

@Component({
  selector: 'app-mantenimiento',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatButtonModule, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './mantenimiento.component.html',
  styleUrl: './mantenimiento.component.scss',
})
export class MantenimientoComponent implements OnInit {
  readonly service  = inject(MantenimientoApiService);
  readonly loading  = this.service.loading;
  readonly ordenes  = this.service.ordenes;
  readonly equipos  = this.service.equipos;

  readonly breadcrumbs = [{ label: 'Inicio', route: '/dashboard' }, { label: 'Mantenimiento' }];
  readonly colsOrdenes = ['codigo', 'equipo', 'descripcion', 'tipo', 'prioridad', 'estado', 'fecha'];
  readonly colsEquipos = ['codigo', 'nombre', 'ubicacion', 'estado', 'proximoMant'];

  ngOnInit(): void { this.service.loadAll(); }

  estadoColor(e: EstadoOrdenTrabajo): string {
    return { abierta: 'warning', en_progreso: 'info', resuelta: 'success', cerrada: 'neutral' }[e] ?? 'info';
  }
  estadoLabel(e: EstadoOrdenTrabajo): string {
    return { abierta: 'Abierta', en_progreso: 'En progreso', resuelta: 'Resuelta', cerrada: 'Cerrada' }[e] ?? e;
  }
  prioridadColor(p: PrioridadOrden): string {
    return { baja: 'success', media: 'info', alta: 'warning', urgente: 'error' }[p] ?? 'info';
  }
  equipoEstadoColor(e: string): string {
    return { operativo: 'success', en_mantenimiento: 'warning', averiado: 'error' }[e] ?? 'info';
  }
  equipoEstadoLabel(e: string): string {
    return { operativo: 'Operativo', en_mantenimiento: 'En mantenimiento', averiado: 'Averiado' }[e] ?? e;
  }
}
