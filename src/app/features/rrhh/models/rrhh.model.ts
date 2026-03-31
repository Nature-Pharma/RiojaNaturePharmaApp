export type EstadoSolicitud = 'pendiente' | 'aprobada' | 'rechazada';

export interface Empleado {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  departamento: string;
  cargo: string;
  turno: string;
  telefono: string;
  activo: boolean;
}

export interface SolicitudPermiso {
  id: string;
  empleadoNombre: string;
  tipo: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: EstadoSolicitud;
  observaciones?: string;
}
