import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { RrhhApiService } from './services/rrhh-api.service';
import { EstadoSolicitud } from './models/rrhh.model';

@Component({
  selector: 'app-rrhh',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule, MatButtonModule, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './rrhh.component.html',
  styleUrl: './rrhh.component.scss',
})
export class RrhhComponent implements OnInit {
  readonly service    = inject(RrhhApiService);
  readonly loading    = this.service.loading;
  readonly empleados  = this.service.empleados;
  readonly solicitudes = this.service.solicitudes;

  readonly breadcrumbs = [{ label: 'Inicio', route: '/dashboard' }, { label: 'RRHH' }];
  readonly colsEmpleados = ['nombre', 'cargo', 'departamento', 'turno', 'telefono', 'activo'];
  readonly colsSolicitudes = ['empleado', 'tipo', 'fechaInicio', 'fechaFin', 'estado'];

  ngOnInit(): void { this.service.loadAll(); }

  solicitudColor(e: EstadoSolicitud): string {
    return { pendiente: 'warning', aprobada: 'success', rechazada: 'error' }[e] ?? 'info';
  }
  solicitudLabel(e: EstadoSolicitud): string {
    return { pendiente: 'Pendiente', aprobada: 'Aprobada', rechazada: 'Rechazada' }[e] ?? e;
  }
}
