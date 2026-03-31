export type PrioridadOrden = 'baja' | 'media' | 'alta' | 'urgente';
export type EstadoOrdenTrabajo = 'abierta' | 'en_progreso' | 'resuelta' | 'cerrada';
export type TipoMantenimiento = 'correctivo' | 'preventivo' | 'predictivo';

export interface OrdenTrabajo {
  id: string;
  codigo: string;
  equipo: string;
  descripcion: string;
  tipo: TipoMantenimiento;
  prioridad: PrioridadOrden;
  estado: EstadoOrdenTrabajo;
  fechaApertura: Date;
  fechaResolucion?: Date;
  responsable: string;
}

export interface Equipo {
  id: string;
  codigo: string;
  nombre: string;
  ubicacion: string;
  estado: 'operativo' | 'en_mantenimiento' | 'averiado';
  ultimoMantenimiento: Date;
  proximoMantenimiento: Date;
}
