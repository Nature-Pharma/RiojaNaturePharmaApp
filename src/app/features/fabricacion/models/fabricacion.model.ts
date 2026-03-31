export type EstadoOrden = 'en_proceso' | 'completado' | 'pausado' | 'cancelado';
export type ResultadoQC = 'aprobado' | 'rechazado' | 'pendiente';

export interface OrdenProduccion {
  id: string;
  codigo: string;
  producto: string;
  cantidad: number;
  unidad: string;
  fechaInicio: Date;
  fechaFin?: Date;
  estado: EstadoOrden;
  linea: string;
  responsable: string;
  progreso: number; // 0-100
}

export interface ControlCalidad {
  id: string;
  ordenId: string;
  lote: string;
  fecha: Date;
  resultado: ResultadoQC;
  analista: string;
  observaciones?: string;
}
