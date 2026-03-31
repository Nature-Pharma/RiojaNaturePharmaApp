import { Injectable, signal } from '@angular/core';
import { delay, of } from 'rxjs';
import { Equipo, OrdenTrabajo } from '../models/mantenimiento.model';

const MOCK_ORDENES: OrdenTrabajo[] = [
  { id: '1', codigo: 'OT-2026-001', equipo: 'Mezcladora L-A', descripcion: 'Revisión de sellos mecánicos', tipo: 'preventivo', prioridad: 'media', estado: 'en_progreso', fechaApertura: new Date('2026-03-30'), responsable: 'P. Ruiz' },
  { id: '2', codigo: 'OT-2026-002', equipo: 'Compresor C-1', descripcion: 'Fallo de presión', tipo: 'correctivo', prioridad: 'urgente', estado: 'abierta', fechaApertura: new Date('2026-03-31'), responsable: 'P. Ruiz' },
  { id: '3', codigo: 'OT-2026-003', equipo: 'Línea Envasado B', descripcion: 'Calibración de dosificadores', tipo: 'preventivo', prioridad: 'baja', estado: 'abierta', fechaApertura: new Date('2026-03-31'), responsable: 'P. Ruiz' },
  { id: '4', codigo: 'OT-2026-004', equipo: 'HVAC Sala Limpia', descripcion: 'Cambio de filtros HEPA', tipo: 'preventivo', prioridad: 'alta', estado: 'resuelta', fechaApertura: new Date('2026-03-28'), fechaResolucion: new Date('2026-03-30'), responsable: 'P. Ruiz' },
];

const MOCK_EQUIPOS: Equipo[] = [
  { id: '1', codigo: 'MEZ-LA', nombre: 'Mezcladora Línea A', ubicacion: 'Sala Fabricación A', estado: 'en_mantenimiento', ultimoMantenimiento: new Date('2026-03-30'), proximoMantenimiento: new Date('2026-06-30') },
  { id: '2', codigo: 'COM-C1', nombre: 'Compresor Central 1', ubicacion: 'Sala Máquinas', estado: 'averiado', ultimoMantenimiento: new Date('2026-02-15'), proximoMantenimiento: new Date('2026-05-15') },
  { id: '3', codigo: 'ENV-LB', nombre: 'Línea Envasado B', ubicacion: 'Sala Envasado', estado: 'operativo', ultimoMantenimiento: new Date('2026-03-01'), proximoMantenimiento: new Date('2026-04-01') },
  { id: '4', codigo: 'HVAC-SL', nombre: 'HVAC Sala Limpia', ubicacion: 'Planta 1', estado: 'operativo', ultimoMantenimiento: new Date('2026-03-30'), proximoMantenimiento: new Date('2026-09-30') },
];

@Injectable({ providedIn: 'root' })
export class MantenimientoApiService {
  private readonly _ordenes  = signal<OrdenTrabajo[]>([]);
  private readonly _equipos  = signal<Equipo[]>([]);
  private readonly _loading  = signal(false);

  readonly ordenes  = this._ordenes.asReadonly();
  readonly equipos  = this._equipos.asReadonly();
  readonly loading  = this._loading.asReadonly();

  loadAll(): void {
    this._loading.set(true);
    of({ ordenes: MOCK_ORDENES, equipos: MOCK_EQUIPOS }).pipe(delay(500)).subscribe(d => {
      this._ordenes.set(d.ordenes);
      this._equipos.set(d.equipos);
      this._loading.set(false);
    });
  }
}
