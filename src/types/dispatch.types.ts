// ========================================================
// Tipos de Negocio Central: Despacho Cooperativa 12 De Mayo
// Alineado con el Backend de Piedad (Node.js, PostgreSQL y Socket.io)
// ========================================================

export type EstadoCarrera = 'PENDIENTE' | 'ASIGNADA' | 'COMPLETADA' | 'CANCELADA';

export type OrigenSolicitud = 'WHATSAPP_TEXTO' | 'WHATSAPP_UBICACION' | 'PANEL_MANUAL';

export interface Carrera {
  id: string;
  clienteTelefono: string;
  clienteNombre: string;
  origenLatitud?: number | null;
  origenLongitud?: number | null;
  latitud?: number | null;
  longitud?: number | null;
  direccionTexto?: string | null;
  referenciaUbicacion?: string | null;
  urlGoogleMaps?: string | null;
  estado: EstadoCarrera;
  unidadId?: string | null;
  unidadNumero?: string | null;
  unidadAsignada?: string | null; // Número de unidad para renderizado rápido (ej: "01", "12")
  unidadPlaca?: string | null;
  choferNombre?: string | null;
  conductorNombre?: string | null;
  choferTelefono?: string | null;
  conductorTelefono?: string | null;
  origenSolicitud?: OrigenSolicitud;
  ultimoMensajeId?: string | null;
  metaMessageId?: string | null;
  tiempoEstimadoMinutos?: number | null;
  motivoCancelacion?: string | null;
  creadoEn: string | Date;
  actualizadoEn?: string | Date;
}

export type EstadoUnidad = 'LIBRE' | 'EN_CARRERA' | 'FUERA_SERVICIO' | 'OCUPADO' | 'INACTIVO';

export interface UnidadTaxi {
  id: string;
  numero: string; // Formato visual de unidad (ej: "01", "12")
  numeroUnidad?: string; // Nombre en BD (ej: "Unidad 01" o "01")
  choferNombre?: string;
  conductorNombre?: string;
  choferTelefono?: string;
  conductorTelefono?: string;
  placa: string;
  estado: EstadoUnidad;
  tipoVehiculo?: 'SEDAN' | 'CAMIONETA' | string;
  modeloVehiculo?: string;
  sectorFrecuente?: string;
  activo?: boolean;
  carreraActualId?: string | null;
  zonaActual?: string;
  creadoEn?: string | Date;
  actualizadoEn?: string | Date;
}

export interface AsignarCarreraDTO {
  carreraId: string;
  unidadId: string;
  unidadAsignada?: string;
  choferNombre?: string;
  choferTelefono?: string;
  tiempoEstimadoMinutos?: number;
}

export interface ActualizarEstadoCarreraDTO {
  carreraId: string;
  nuevoEstado: EstadoCarrera;
  motivoCancelacion?: string;
}

export type SocketStatus = 'CONECTADO' | 'RECONECTANDO' | 'DESCONECTADO';

export type FiltroFlota = 'TODOS' | 'LIBRE' | 'EN_CARRERA' | 'FUERA_SERVICIO';
