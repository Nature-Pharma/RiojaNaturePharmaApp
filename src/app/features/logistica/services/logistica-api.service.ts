import { Injectable, signal } from '@angular/core';
import { delay, of } from 'rxjs';
import { Envio, Producto } from '../models/logistica.model';

const MOCK_PRODUCTOS: Producto[] = [
  { id: '1', codigo: 'MAT-001', nombre: 'Amoxicilina API', stock: 500, stockMinimo: 200, unidad: 'kg', ubicacion: 'Almacén A-1' },
  { id: '2', codigo: 'MAT-002', nombre: 'Ibuprofeno API', stock: 120, stockMinimo: 150, unidad: 'kg', ubicacion: 'Almacén A-2' },
  { id: '3', codigo: 'MAT-003', nombre: 'Celulosa Microcristalina', stock: 1200, stockMinimo: 500, unidad: 'kg', ubicacion: 'Almacén B-1' },
  { id: '4', codigo: 'MAT-004', nombre: 'Paracetamol API', stock: 80, stockMinimo: 300, unidad: 'kg', ubicacion: 'Almacén A-3' },
  { id: '5', codigo: 'ENV-001', nombre: 'Blíster PVC/aluminio', stock: 50000, stockMinimo: 20000, unidad: 'ud', ubicacion: 'Almacén C-1' },
];

const MOCK_ENVIOS: Envio[] = [
  { id: '1', referencia: 'ENV-2026-0101', origen: 'Proveedor Químico SA', destino: 'Almacén Nature-Pharma', fecha: new Date('2026-03-30'), estado: 'en_transito', productos: 3, transportista: 'Transporte Rápido SL' },
  { id: '2', referencia: 'ENV-2026-0102', origen: 'Nature-Pharma', destino: 'Farmacéutica Sur SA', fecha: new Date('2026-03-31'), estado: 'pendiente', productos: 2, transportista: 'MRW Farma' },
  { id: '3', referencia: 'ENV-2026-0099', origen: 'Excipients Europe', destino: 'Nature-Pharma', fecha: new Date('2026-03-29'), estado: 'entregado', productos: 4, transportista: 'DHL Pharma' },
];

@Injectable({ providedIn: 'root' })
export class LogisticaApiService {
  private readonly _productos = signal<Producto[]>([]);
  private readonly _envios    = signal<Envio[]>([]);
  private readonly _loading   = signal(false);

  readonly productos = this._productos.asReadonly();
  readonly envios    = this._envios.asReadonly();
  readonly loading   = this._loading.asReadonly();

  loadAll(): void {
    this._loading.set(true);
    of({ productos: MOCK_PRODUCTOS, envios: MOCK_ENVIOS }).pipe(delay(500)).subscribe(d => {
      this._productos.set(d.productos);
      this._envios.set(d.envios);
      this._loading.set(false);
    });
  }
}
