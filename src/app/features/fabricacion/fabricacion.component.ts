import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { FabricacionApiService } from './services/fabricacion-api.service';
import { EstadoOrden } from './models/fabricacion.model';

@Component({
  selector: 'app-fabricacion',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './fabricacion.component.html',
  styleUrl: './fabricacion.component.scss',
})
export class FabricacionComponent implements OnInit {
  readonly service = inject(FabricacionApiService);
  readonly ordenes  = this.service.ordenes;
  readonly loading  = this.service.loading;

  readonly displayedColumns = ['codigo', 'producto', 'linea', 'cantidad', 'progreso', 'estado', 'responsable'];

  readonly breadcrumbs = [
    { label: 'Inicio', route: '/dashboard' },
    { label: 'Fabricación' },
  ];

  ngOnInit(): void {
    this.service.loadOrdenes();
    this.service.loadControlCalidad();
  }

  getEstadoColor(estado: EstadoOrden): string {
    const map: Record<EstadoOrden, string> = {
      en_proceso: 'primary',
      completado: 'success',
      pausado: 'warning',
      cancelado: 'error',
    };
    return map[estado];
  }

  getEstadoLabel(estado: EstadoOrden): string {
    const map: Record<EstadoOrden, string> = {
      en_proceso: 'En proceso',
      completado: 'Completado',
      pausado: 'Pausado',
      cancelado: 'Cancelado',
    };
    return map[estado];
  }
}
