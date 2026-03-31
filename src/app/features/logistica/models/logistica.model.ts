export type EstadoEnvio = 'pendiente' | 'en_transito' | 'entregado' | 'devuelto';
export type TipoMovimiento = 'entrada' | 'salida';

export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  stock: number;
  stockMinimo: number;
  unidad: string;
  ubicacion: string;
}

export interface Envio {
  id: string;
  referencia: string;
  origen: string;
  destino: string;
  fecha: Date;
  estado: EstadoEnvio;
  productos: number;
  transportista: string;
}
