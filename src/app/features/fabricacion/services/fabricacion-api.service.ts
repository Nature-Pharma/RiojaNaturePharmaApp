import { Injectable, signal } from '@angular/core';
import { delay, of } from 'rxjs';
import { ControlCalidad, OrdenProduccion } from '../models/fabricacion.model';

const MOCK_ORDENES: OrdenProduccion[] = [
  { id: '1', codigo: 'OP-2026-001', producto: 'Amoxicilina 500mg', cantidad: 50000, unidad: 'comprimidos', fechaInicio: new Date('2026-03-30'), estado: 'en_proceso', linea: 'Línea A', responsable: 'M. López', progreso: 65 },
  { id: '2', codigo: 'OP-2026-002', producto: 'Ibuprofeno 400mg', cantidad: 30000, unidad: 'comprimidos', fechaInicio: new Date('2026-03-31'), estado: 'en_proceso', linea: 'Línea B', responsable: 'M. López', progreso: 20 },
  { id: '3', codigo: 'OP-2026-003', producto: 'Paracetamol 1g', cantidad: 80000, unidad: 'comprimidos', fechaInicio: new Date('2026-03-28'), fechaFin: new Date('2026-03-31'), estado: 'completado', linea: 'Línea A', responsable: 'M. López', progreso: 100 },
  { id: '4', codigo: 'OP-2026-004', producto: 'Vitamina C 1000mg', cantidad: 20000, unidad: 'cápsulas', fechaInicio: new Date('2026-03-31'), estado: 'pausado', linea: 'Línea C', responsable: 'M. López', progreso: 40 },
];

const MOCK_QC: ControlCalidad[] = [
  { id: '1', ordenId: '3', lote: 'LOTE-2026-031', fecha: new Date('2026-03-31'), resultado: 'aprobado', analista: 'QC Team', observaciones: 'Cumple especificaciones' },
  { id: '2', ordenId: '1', lote: 'LOTE-2026-032', fecha: new Date('2026-03-31'), resultado: 'pendiente', analista: 'QC Team' },
];

@Injectable({ providedIn: 'root' })
export class FabricacionApiService {
  private readonly _ordenes  = signal<OrdenProduccion[]>([]);
  private readonly _qcData   = signal<ControlCalidad[]>([]);
  private readonly _loading  = signal(false);

  readonly ordenes  = this._ordenes.asReadonly();
  readonly qcData   = this._qcData.asReadonly();
  readonly loading  = this._loading.asReadonly();

  loadOrdenes(): void {
    this._loading.set(true);
    of(MOCK_ORDENES).pipe(delay(500)).subscribe(data => {
      this._ordenes.set(data);
      this._loading.set(false);
    });
  }

  loadControlCalidad(): void {
    of(MOCK_QC).pipe(delay(300)).subscribe(data => this._qcData.set(data));
  }
}
