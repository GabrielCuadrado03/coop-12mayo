// ========================================================
// Hook de Despacho en Tiempo Real y Conexión Socket.io
// Integrado con el Backend de Piedad (Cooperativa 12 De Mayo)
// ========================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  Carrera,
  UnidadTaxi,
  SocketStatus,
  EstadoUnidad
} from '../types/dispatch.types';
import {
  carrerasApi,
  flotaApi,
  mapBackendCarreraToFrontend
} from '../services/api';
import { soundEffects } from '../utils/audioAlerts';
import { INITIAL_TAXI_FLEET } from '../utils/initialFleet';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export function useSocketDispatch() {
  const [socketStatus, setSocketStatus] = useState<SocketStatus>('RECONECTANDO');
  const [reconnectAttempts, setReconnectAttempts] = useState<number>(0);
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [unidades, setUnidades] = useState<UnidadTaxi[]>([]);
  const [lastNotification, setLastNotification] = useState<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'alert';
  } | null>(null);

  const socketRef = useRef<Socket | null>(null);

  // Helper para notificaciones tipo Toast
  const notify = useCallback((message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    setLastNotification({ id: Math.random().toString(), message, type });
    setTimeout(() => {
      setLastNotification((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  // Función para sincronizar datos iniciales desde la API REST de Piedad
  const sincronizarDatos = useCallback(async () => {
    try {
      const [carrerasActivas, unidadesFlota] = await Promise.all([
        carrerasApi.obtenerActivas().catch((err) => {
          console.warn('⚠️ No se pudieron cargar carreras activas iniciales:', err.message);
          return [] as Carrera[];
        }),
        flotaApi.obtenerTodasLasUnidades().catch((err) => {
          console.warn('⚠️ No se pudo cargar la flota inicial de la base de datos:', err.message);
          return [] as UnidadTaxi[];
        })
      ]);

      setCarreras(carrerasActivas);

      // Si la base de datos aún no tiene unidades cargadas, usamos la flota base de respaldo
      if (unidadesFlota && unidadesFlota.length > 0) {
        setUnidades(unidadesFlota);
      } else {
        setUnidades(INITIAL_TAXI_FLEET);
      }
    } catch (err) {
      console.error('❌ Error sincronizando datos con la central:', err);
    }
  }, []);

  // 1. Cargar datos reales al montar el panel
  useEffect(() => {
    sincronizarDatos();
  }, [sincronizarDatos]);

  // 2. Conexión persistente WebSockets con Socket.io
  useEffect(() => {
    const socket: Socket = io(BACKEND_URL, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      transports: ['websocket', 'polling']
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('⚡ Conectado al backend de Piedad con Socket ID:', socket.id);
      setSocketStatus('CONECTADO');
      setReconnectAttempts(0);

      // Unirse a la sala de despacho en el servidor
      socket.emit('unirse_despacho');
      notify('Conexión en tiempo real activa con la central', 'success');

      // Re-sincronizar carreras y flota para garantizar datos frescos
      sincronizarDatos();
    });

    socket.on('disconnect', (reason) => {
      console.warn('⚠️ Desconectado del servidor de despacho:', reason);
      setSocketStatus('DESCONECTADO');
    });

    socket.on('reconnect_attempt', (attempt) => {
      setSocketStatus('RECONECTANDO');
      setReconnectAttempts(attempt);
    });

    socket.on('reconnect', () => {
      setSocketStatus('CONECTADO');
      setReconnectAttempts(0);
      notify('Conexión reestablecida con la central', 'success');
      socket.emit('unirse_despacho');
      sincronizarDatos();
    });

    // ----------------------------------------------------
    // CONTRATO DE EVENTOS EN TIEMPO REAL (Backend Piedad)
    // ----------------------------------------------------

    // EVENTO 1: 'nueva_carrera' (Solicitud entrante de WhatsApp)
    socket.on('nueva_carrera', (rawCarrera: any) => {
      console.log('🔔 [Socket] nueva_carrera recibida:', rawCarrera);
      const nueva = mapBackendCarreraToFrontend(rawCarrera);

      setCarreras((prev) => {
        if (prev.some((c) => c.id === nueva.id)) return prev;
        return [nueva, ...prev];
      });

      // Timbre sonoro sintetizado de alerta
      soundEffects.playNewRideAlert();
      notify(`Nueva solicitud de ${nueva.clienteNombre || nueva.clienteTelefono}`, 'alert');
    });

    // EVENTO 2: 'carrera_asignada' (Taxi asignado con éxito)
    socket.on('carrera_asignada', (data: {
      id: string;
      unidadAsignada: string;
      choferNombre: string;
      choferTelefono: string;
      tiempoEstimadoMinutos: number;
      estado: 'ASIGNADA';
      actualizadoEn: string;
    }) => {
      console.log('🚖 [Socket] carrera_asignada recibida:', data);
      const numLimpio = data.unidadAsignada
        ? data.unidadAsignada.replace(/unidad\s*/i, '').trim()
        : '';

      setCarreras((prev) =>
        prev.map((c) =>
          c.id === data.id
            ? {
                ...c,
                estado: 'ASIGNADA',
                unidadAsignada: numLimpio,
                choferNombre: data.choferNombre,
                choferTelefono: data.choferTelefono,
                tiempoEstimadoMinutos: data.tiempoEstimadoMinutos,
                actualizadoEn: data.actualizadoEn
              }
            : c
        )
      );

      // Pasar la unidad a estado Ocupado / En Carrera
      setUnidades((prev) =>
        prev.map((u) =>
          u.numero === numLimpio || u.numeroUnidad === data.unidadAsignada
            ? {
                ...u,
                estado: 'EN_CARRERA',
                carreraActualId: data.id,
                actualizadoEn: data.actualizadoEn
              }
            : u
        )
      );

      soundEffects.playSuccessDispatch();
      notify(`Unidad #${numLimpio} asignada exitosamente`, 'success');
    });

    // EVENTO 3: 'carrera_completada' (Viaje finalizado)
    socket.on('carrera_completada', (data: { id: string; completadoEn: string }) => {
      console.log('✅ [Socket] carrera_completada:', data);

      setCarreras((prev) => {
        const carreraTarget = prev.find((c) => c.id === data.id);
        if (carreraTarget && (carreraTarget.unidadAsignada || carreraTarget.unidadNumero)) {
          const num = carreraTarget.unidadAsignada || carreraTarget.unidadNumero;
          setUnidades((uList) =>
            uList.map((u) =>
              u.numero === num || u.numeroUnidad === num
                ? {
                    ...u,
                    estado: 'LIBRE',
                    carreraActualId: null,
                    actualizadoEn: data.completadoEn
                  }
                : u
            )
          );
        }
        return prev.map((c) =>
          c.id === data.id
            ? { ...c, estado: 'COMPLETADA', actualizadoEn: data.completadoEn }
            : c
        );
      });

      notify('Carrera completada y unidad liberada', 'info');
    });

    // EVENTO 4: 'carrera_cancelada'
    socket.on('carrera_cancelada', (data: { id: string; motivo?: string; canceladoEn: string }) => {
      console.log('❌ [Socket] carrera_cancelada:', data);

      setCarreras((prev) => {
        const carreraTarget = prev.find((c) => c.id === data.id);
        if (carreraTarget && (carreraTarget.unidadAsignada || carreraTarget.unidadNumero)) {
          const num = carreraTarget.unidadAsignada || carreraTarget.unidadNumero;
          setUnidades((uList) =>
            uList.map((u) =>
              u.numero === num || u.numeroUnidad === num
                ? {
                    ...u,
                    estado: 'LIBRE',
                    carreraActualId: null,
                    actualizadoEn: data.canceladoEn
                  }
                : u
            )
          );
        }
        return prev.map((c) =>
          c.id === data.id
            ? {
                ...c,
                estado: 'CANCELADA',
                motivoCancelacion: data.motivo,
                actualizadoEn: data.canceladoEn
              }
            : c
        );
      });

      notify(`Carrera cancelada${data.motivo ? `: ${data.motivo}` : ''}`, 'alert');
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [notify, sincronizarDatos]);

  // ----------------------------------------------------
  // ACCIONES OPERATIVAS (< 3 segundos / Zero-Refresh)
  // ----------------------------------------------------

  /**
   * Asignar carrera a un vehículo en 1 solo clic.
   * Aplica actualización optimista inmediata (<16ms) y llama a POST /api/dispatch/:id/assign
   */
  const asignarCarrera = useCallback(
    async (carreraId: string, unidad: UnidadTaxi, tiempoEstimadoMinutos: number = 5): Promise<boolean> => {
      const fechaActual = new Date().toISOString();
      const numLimpio = unidad.numero;

      // 1. Actualización Optimista inmediata en UI
      setCarreras((prev) =>
        prev.map((c) =>
          c.id === carreraId
            ? {
                ...c,
                estado: 'ASIGNADA',
                unidadId: unidad.id,
                unidadAsignada: numLimpio,
                choferNombre: unidad.choferNombre,
                choferTelefono: unidad.choferTelefono,
                tiempoEstimadoMinutos,
                actualizadoEn: fechaActual
              }
            : c
        )
      );

      setUnidades((prev) =>
        prev.map((u) =>
          u.id === unidad.id
            ? { ...u, estado: 'EN_CARRERA', carreraActualId: carreraId, actualizadoEn: fechaActual }
            : u
        )
      );

      soundEffects.playSuccessDispatch();
      notify(`Despachando Unidad #${numLimpio}...`, 'info');

      // 2. Llamada REST al backend de Piedad: POST /api/dispatch/:id/assign
      try {
        await carrerasApi.asignar(carreraId, unidad.id, tiempoEstimadoMinutos);
        // El backend de Piedad emitirá 'carrera_asignada' a todos los sockets conectados
        return true;
      } catch (err: any) {
        console.error('Error al asignar carrera en el servidor:', err);
        notify(`Error al asignar unidad: ${err.message}`, 'alert');
        // Revertir sincronizando con la base de datos
        sincronizarDatos();
        return false;
      }
    },
    [notify, sincronizarDatos]
  );

  /**
   * Completar una carrera: POST /api/dispatch/:id/complete
   */
  const completarCarrera = useCallback(
    async (carreraId: string) => {
      // Actualización optimista
      setCarreras((prev) => {
        const target = prev.find((c) => c.id === carreraId);
        if (target && target.unidadAsignada) {
          setUnidades((uList) =>
            uList.map((u) =>
              u.numero === target.unidadAsignada
                ? { ...u, estado: 'LIBRE', carreraActualId: null, actualizadoEn: new Date().toISOString() }
                : u
            )
          );
        }
        return prev.map((c) => (c.id === carreraId ? { ...c, estado: 'COMPLETADA' } : c));
      });

      try {
        await carrerasApi.completar(carreraId);
      } catch (err: any) {
        notify(`Error al completar carrera: ${err.message}`, 'alert');
        sincronizarDatos();
      }
    },
    [notify, sincronizarDatos]
  );

  /**
   * Cancelar una carrera: POST /api/dispatch/:id/cancel
   */
  const cancelarCarrera = useCallback(
    async (carreraId: string, motivo: string = 'Cancelado por operadora') => {
      // Actualización optimista
      setCarreras((prev) => {
        const target = prev.find((c) => c.id === carreraId);
        if (target && target.unidadAsignada) {
          setUnidades((uList) =>
            uList.map((u) =>
              u.numero === target.unidadAsignada
                ? { ...u, estado: 'LIBRE', carreraActualId: null, actualizadoEn: new Date().toISOString() }
                : u
            )
          );
        }
        return prev.map((c) => (c.id === carreraId ? { ...c, estado: 'CANCELADA' } : c));
      });

      try {
        await carrerasApi.cancelar(carreraId, motivo);
      } catch (err: any) {
        notify(`Error al cancelar carrera: ${err.message}`, 'alert');
        sincronizarDatos();
      }
    },
    [notify, sincronizarDatos]
  );

  /**
   * Crear carrera manual (Radio / Teléfono)
   */
  const crearCarreraManual = useCallback(
    (nueva: Omit<Carrera, 'id' | 'creadoEn' | 'actualizadoEn' | 'estado'>) => {
      const carreraId = 'manual-' + Math.random().toString(36).substring(2, 9);
      const nuevaCarrera: Carrera = {
        ...nueva,
        id: carreraId,
        estado: 'PENDIENTE',
        origenSolicitud: 'PANEL_MANUAL',
        creadoEn: new Date().toISOString(),
        actualizadoEn: new Date().toISOString()
      };

      setCarreras((prev) => [nuevaCarrera, ...prev]);
      soundEffects.playNewRideAlert();
      notify(`Carrera manual ingresada para ${nuevaCarrera.clienteNombre}`, 'info');
    },
    [notify]
  );

  /**
   * Modificar estado de unidad: PATCH /api/units/:id/status
   */
  const cambiarEstadoUnidad = useCallback(
    async (unidadId: string, nuevoEstado: EstadoUnidad) => {
      // Optimista
      setUnidades((prev) =>
        prev.map((u) =>
          u.id === unidadId
            ? {
                ...u,
                estado: nuevoEstado,
                carreraActualId: nuevoEstado !== 'EN_CARRERA' ? null : u.carreraActualId,
                actualizadoEn: new Date().toISOString()
              }
            : u
        )
      );

      try {
        await flotaApi.actualizarEstado(unidadId, nuevoEstado);
      } catch (err: any) {
        console.warn('⚠️ No se pudo persistir el estado de la unidad:', err.message);
      }
    },
    []
  );

  return {
    socketStatus,
    reconnectAttempts,
    carreras,
    unidades,
    lastNotification,
    asignarCarrera,
    completarCarrera,
    cancelarCarrera,
    crearCarreraManual,
    cambiarEstadoUnidad,
    sincronizarDatos
  };
}
