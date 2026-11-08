// ========================================================
// Cliente API Axios y Servicios REST de Despacho
// Integración con el Backend de Piedad (Cooperativa 12 De Mayo)
// ========================================================

import axios, { AxiosError } from 'axios';
import {
  Carrera,
  UnidadTaxi,
  EstadoUnidad,
  OrigenSolicitud
} from '../types/dispatch.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Interceptor para manejo de errores centralizado
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorMsg =
      (error.response?.data as { error?: string; message?: string })?.error ||
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      'Error de conexión con el backend de Piedad';
    console.error('❌ [API Error]:', errorMsg);
    return Promise.reject(new Error(errorMsg));
  }
);

/**
 * Normaliza una Carrera proveniente del Backend de Piedad
 */
export function mapBackendCarreraToFrontend(raw: any): Carrera {
  const rawUnidad = raw.unidadAsignada || raw.unidadNumero || raw.unidad_numero || null;
  const unidadAsignada = rawUnidad
    ? String(rawUnidad).replace(/unidad\s*/i, '').trim() || String(rawUnidad)
    : null;

  const lat = raw.origenLatitud !== null && raw.origenLatitud !== undefined ? Number(raw.origenLatitud) : null;
  const lng = raw.origenLongitud !== null && raw.origenLongitud !== undefined ? Number(raw.origenLongitud) : null;

  let urlGoogleMaps = raw.urlGoogleMaps || raw.url_google_maps || null;
  if (!urlGoogleMaps && lat && lng) {
    urlGoogleMaps = `https://www.google.com/maps?q=${lat},${lng}`;
  }

  let origenSolicitud: OrigenSolicitud = raw.origenSolicitud || 'WHATSAPP_TEXTO';
  if (lat && lng) {
    origenSolicitud = 'WHATSAPP_UBICACION';
  } else if (raw.origenSolicitud === 'PANEL_MANUAL') {
    origenSolicitud = 'PANEL_MANUAL';
  }

  return {
    id: raw.id,
    clienteTelefono: raw.clienteTelefono || raw.cliente_telefono || '',
    clienteNombre: raw.clienteNombre || raw.cliente_nombre || 'Cliente WhatsApp',
    origenLatitud: lat,
    origenLongitud: lng,
    direccionTexto: raw.direccionTexto || raw.direccion_texto || 'Ubicación registrada',
    referenciaUbicacion: raw.referenciaUbicacion || raw.referencia_ubicacion || null,
    urlGoogleMaps,
    estado: raw.estado || 'PENDIENTE',
    unidadId: raw.unidadId || raw.unidad_id || null,
    unidadNumero: raw.unidadNumero || raw.unidad_numero || null,
    unidadAsignada,
    choferNombre: raw.choferNombre || raw.chofer_nombre || null,
    choferTelefono: raw.choferTelefono || raw.chofer_telefono || null,
    origenSolicitud,
    tiempoEstimadoMinutos: raw.tiempoEstimadoMinutos || raw.tiempo_estimado_minutos || 5,
    motivoCancelacion: raw.motivoCancelacion || raw.motivo_cancelacion || null,
    creadoEn: raw.creadoEn || raw.creado_en || new Date().toISOString(),
    actualizadoEn: raw.actualizadoEn || raw.actualizado_en || new Date().toISOString()
  };
}

/**
 * Normaliza una Unidad de Taxi proveniente del Backend de Piedad
 */
export function mapBackendUnitToFrontend(raw: any): UnidadTaxi {
  const rawNum = raw.numeroUnidad || raw.numero_unidad || raw.numero || '';
  const cleanNum = String(rawNum).replace(/unidad\s*/i, '').trim() || String(rawNum);

  // Mapear estados backend ('LIBRE' | 'OCUPADO' | 'INACTIVO') a los equivalentes visuales
  let mappedEstado: EstadoUnidad = raw.estado || 'LIBRE';
  if (raw.estado === 'OCUPADO') mappedEstado = 'EN_CARRERA';
  if (raw.estado === 'INACTIVO') mappedEstado = 'FUERA_SERVICIO';

  return {
    id: raw.id,
    numero: cleanNum,
    numeroUnidad: raw.numeroUnidad || raw.numero_unidad || `Unidad ${cleanNum}`,
    choferNombre: raw.choferNombre || raw.chofer_nombre || 'Chofer Asignado',
    choferTelefono: raw.choferTelefono || raw.chofer_telefono || '',
    placa: raw.placa || 'PBC-0000',
    estado: mappedEstado,
    activo: raw.activo ?? true,
    zonaActual: raw.zonaActual || 'Sector Centro',
    creadoEn: raw.creadoEn || raw.creado_en || new Date().toISOString(),
    actualizadoEn: raw.actualizadoEn || raw.actualizado_en || new Date().toISOString()
  };
}

// ========================================================
// SERVICIO DE CARRERAS (Endpoints de Piedad)
// ========================================================
export const carrerasApi = {
  /**
   * GET /api/dispatch/active
   * Carga carreras activas (PENDIENTE y ASIGNADA) desde PostgreSQL
   */
  obtenerActivas: async (): Promise<Carrera[]> => {
    const { data } = await apiClient.get<{ ok: boolean; data: any[] }>('/dispatch/active');
    return (data.data || []).map(mapBackendCarreraToFrontend);
  },

  /**
   * POST /api/dispatch/:id/assign
   * Asignar una unidad a una carrera (Transacción ACID en el backend)
   */
  asignar: async (carreraId: string, unidadId: string, etaMinutes: number = 5): Promise<Carrera> => {
    const { data } = await apiClient.post<{ ok: boolean; data: any }>(`/dispatch/${carreraId}/assign`, {
      unidadId,
      etaMinutes
    });
    return mapBackendCarreraToFrontend(data.data);
  },

  /**
   * POST /api/dispatch/:id/complete
   * Marca una carrera como completada y libera el vehículo en el backend
   */
  completar: async (carreraId: string): Promise<Carrera> => {
    const { data } = await apiClient.post<{ ok: boolean; data: any }>(`/dispatch/${carreraId}/complete`);
    return mapBackendCarreraToFrontend(data.data);
  },

  /**
   * POST /api/dispatch/:id/cancel
   * Cancela una carrera y libera la unidad asignada
   */
  cancelar: async (carreraId: string, motivo?: string): Promise<Carrera> => {
    const { data } = await apiClient.post<{ ok: boolean; data: any }>(`/dispatch/${carreraId}/cancel`, {
      motivo
    });
    return mapBackendCarreraToFrontend(data.data);
  }
};

// ========================================================
// SERVICIO DE UNIDADES (Endpoints de Piedad)
// ========================================================
export const flotaApi = {
  /**
   * GET /api/units/free
   * Obtiene los taxis libres disponibles para asignación
   */
  obtenerUnidadesLibres: async (): Promise<UnidadTaxi[]> => {
    const { data } = await apiClient.get<{ ok: boolean; data: any[] }>('/units/free');
    return (data.data || []).map(mapBackendUnitToFrontend);
  },

  /**
   * GET /api/units
   * Obtiene toda la flota registrada en PostgreSQL
   */
  obtenerTodasLasUnidades: async (): Promise<UnidadTaxi[]> => {
    const { data } = await apiClient.get<{ ok: boolean; data: any[] }>('/units');
    return (data.data || []).map(mapBackendUnitToFrontend);
  },

  /**
   * PATCH /api/units/:id/status
   * Modifica el estado operativo (LIBRE, OCUPADO, INACTIVO)
   */
  actualizarEstado: async (unidadId: string, estadoVisual: EstadoUnidad): Promise<UnidadTaxi> => {
    let backendStatus: 'LIBRE' | 'OCUPADO' | 'INACTIVO' = 'LIBRE';
    if (estadoVisual === 'EN_CARRERA' || estadoVisual === 'OCUPADO') backendStatus = 'OCUPADO';
    if (estadoVisual === 'FUERA_SERVICIO' || estadoVisual === 'INACTIVO') backendStatus = 'INACTIVO';

    const { data } = await apiClient.patch<{ ok: boolean; data: any }>(`/units/${unidadId}/status`, {
      status: backendStatus
    });
    return mapBackendUnitToFrontend(data.data);
  }
};
