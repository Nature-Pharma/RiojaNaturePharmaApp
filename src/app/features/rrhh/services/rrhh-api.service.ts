import { Injectable, signal } from '@angular/core';
import { delay, of } from 'rxjs';
import { Empleado, SolicitudPermiso } from '../models/rrhh.model';

const MOCK_EMPLEADOS: Empleado[] = [
  { id: '1', nombre: 'María', apellidos: 'López Martín', email: 'fabricacion@naturepharma.es', departamento: 'Fabricación', cargo: 'Técnico de Producción', turno: 'Mañana', telefono: '612 345 678', activo: true },
  { id: '2', nombre: 'Juan', apellidos: 'Martínez García', email: 'logistica@naturepharma.es', departamento: 'Logística', cargo: 'Responsable de Almacén', turno: 'Mañana', telefono: '623 456 789', activo: true },
  { id: '3', nombre: 'Ana', apellidos: 'Sánchez Ruiz', email: 'rrhh@naturepharma.es', departamento: 'RRHH', cargo: 'Técnico RRHH', turno: 'Mañana', telefono: '634 567 890', activo: true },
  { id: '4', nombre: 'Pedro', apellidos: 'Ruiz González', email: 'mantenimiento@naturepharma.es', departamento: 'Mantenimiento', cargo: 'Técnico de Mantenimiento', turno: 'Tarde', telefono: '645 678 901', activo: true },
  { id: '5', nombre: 'Carlos', apellidos: 'García López', email: 'admin@naturepharma.es', departamento: 'Dirección', cargo: 'Director General', turno: 'Mañana', telefono: '656 789 012', activo: true },
  { id: '6', nombre: 'Laura', apellidos: 'Fernández Díaz', email: 'laura.fernandez@naturepharma.es', departamento: 'Fabricación', cargo: 'Operario', turno: 'Noche', telefono: '667 890 123', activo: false },
];

const MOCK_SOLICITUDES: SolicitudPermiso[] = [
  { id: '1', empleadoNombre: 'María López Martín', tipo: 'Vacaciones', fechaInicio: new Date('2026-04-07'), fechaFin: new Date('2026-04-18'), estado: 'pendiente' },
  { id: '2', empleadoNombre: 'Juan Martínez García', tipo: 'Asunto propio', fechaInicio: new Date('2026-04-02'), fechaFin: new Date('2026-04-02'), estado: 'aprobada', observaciones: 'Aprobado' },
  { id: '3', empleadoNombre: 'Pedro Ruiz González', tipo: 'Vacaciones', fechaInicio: new Date('2026-04-14'), fechaFin: new Date('2026-04-25'), estado: 'pendiente' },
];

@Injectable({ providedIn: 'root' })
export class RrhhApiService {
  private readonly _empleados   = signal<Empleado[]>([]);
  private readonly _solicitudes = signal<SolicitudPermiso[]>([]);
  private readonly _loading     = signal(false);

  readonly empleados   = this._empleados.asReadonly();
  readonly solicitudes = this._solicitudes.asReadonly();
  readonly loading     = this._loading.asReadonly();

  loadAll(): void {
    this._loading.set(true);
    of({ empleados: MOCK_EMPLEADOS, solicitudes: MOCK_SOLICITUDES }).pipe(delay(500)).subscribe(d => {
      this._empleados.set(d.empleados);
      this._solicitudes.set(d.solicitudes);
      this._loading.set(false);
    });
  }
}
