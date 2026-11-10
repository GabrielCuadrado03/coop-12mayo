// ========================================================
// Hook de Despacho en Tiempo Real con Firebase Firestore
// Cooperativa de Transportes 12 de Mayo - Puyo, Pastaza
// ========================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Carrera,
  UnidadTaxi,
  SocketStatus,
  EstadoUnidad
} from '../types/dispatch.types';
import { dispatchFirebaseService } from '../services/dispatchFirebase.service';
import { isFirebaseConfigured } from '../services/firebase';
import { soundEffects } from '../utils/audioAlerts';
import { INITIAL_TAXI_FLEET } from '../utils/initialFleet';

export function useFirebaseDispatch() {
  const [connectionStatus, setConnectionStatus] = useState<SocketStatus>(
    isFirebaseConfigured ? 'CONECTADO' : 'RECONECTANDO'
  );
  const [reconnectAttempts, setReconnectAttempts] = useState<number>(0);
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [unidades, setUnidades] = useState<UnidadTaxi[]>(INITIAL_TAXI_FLEET);
  const [lastNotification, setLastNotification] = useState<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'alert';
  } | null>(null);

  // Ref para contar carreras previas y solo sonar cuando entra una NUEVA
  const prevPendingCountRef = useRef<number>(0);

  const notify = useCallback(
    (message: string, type: 'info' | 'success' | 'alert' = 'info') => {
      setLastNotification({ id: Math.random().toString(), message, type });
      setTimeout(() => {
        setLastNotification((prev) => (prev?.message === message ? null : prev));
      }, 4000);
    },
    []
  );

  // 1. Suscripción en Tiempo Real a Firebase Firestore
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setConnectionStatus('RECONECTANDO');
      setReconnectAttempts(1);
      return;
    }

    setConnectionStatus('CONECTADO');

    // Escuchar carreras en vivo
    const unsubCarreras = dispatchFirebaseService.subscribeToCarreras(
      (nuevasCarreras) => {
        setCarreras(nuevasCarreras);

        // Detectar si ingresó una nueva carrera pendiente para reproducir el timbre
        const currentPending = nuevasCarreras.filter((c) => c.estado === 'PENDIENTE').length;
        if (currentPending > prevPendingCountRef.current && prevPendingCountRef.current !== 0) {
          soundEffects.playNewRideAlert();
          notify('🔔 ¡Nueva solicitud de carrera recibida!', 'alert');
        }
        prevPendingCountRef.current = currentPending;
      },
      (err) => {
        console.error('Error en suscripción de carreras:', err);
        setConnectionStatus('DESCONECTADO');
      }
    );

    // Escuchar flota de unidades en vivo
    const unsubUnidades = dispatchFirebaseService.subscribeToUnidades(
      (nuevasUnidades) => {
        if (nuevasUnidades.length > 0) {
          setUnidades(nuevasUnidades);
        }
      },
      (err) => {
        console.error('Error en suscripción de flota:', err);
      }
    );

    return () => {
      unsubCarreras();
      unsubUnidades();
    };
  }, [notify]);

  // 2. Acción: Asignar unidad a carrera
  const asignarCarrera = useCallback(
    async (carreraId: string, unidadOrNumero: UnidadTaxi | string, tiempoEstimado?: number) => {
      try {
        let unidadTarget: UnidadTaxi | undefined;
        let unidadNumero = '';

        if (typeof unidadOrNumero === 'string') {
          unidadNumero = unidadOrNumero;
          unidadTarget = unidades.find(
            (u) => u.numero === unidadNumero || u.numeroUnidad === unidadNumero
          );
        } else {
          unidadTarget = unidadOrNumero;
          unidadNumero = unidadTarget.numero;
        }

        if (!unidadTarget) {
          notify(`No se encontró la Unidad ${unidadNumero}`, 'alert');
          return;
        }

        if (isFirebaseConfigured) {
          await dispatchFirebaseService.asignarCarrera(carreraId, unidadTarget);
        } else {
          // Modo demostración local en memoria
          setCarreras((prev) =>
            prev.map((c) =>
              c.id === carreraId
                ? {
                    ...c,
                    estado: 'ASIGNADA',
                    unidadId: unidadTarget!.id,
                    unidadAsignada: unidadNumero,
                    unidadNumero: unidadNumero,
                    choferNombre: unidadTarget!.choferNombre,
                    conductorNombre: unidadTarget!.conductorNombre,
                    tiempoEstimadoMinutos: tiempoEstimado || 5,
                  }
                : c
            )
          );
          setUnidades((prev) =>
            prev.map((u) =>
              u.numero === unidadNumero || u.id === unidadTarget!.id
                ? { ...u, estado: 'EN_CARRERA', carreraActualId: carreraId }
                : u
            )
          );
        }

        soundEffects.playSuccessDispatch();
        notify(`✅ Unidad ${unidadNumero} asignada con éxito`, 'success');
      } catch (err: any) {
        console.error('Error al asignar carrera:', err);
        notify(err.message || 'Error al despachar unidad', 'alert');
      }
    },
    [unidades, notify]
  );

  // 3. Acción: Completar carrera
  const completarCarrera = useCallback(
    async (carreraId: string) => {
      try {
        const carrera = carreras.find((c) => c.id === carreraId);
        const unidadId = carrera?.unidadId || undefined;

        if (isFirebaseConfigured) {
          await dispatchFirebaseService.completarCarrera(carreraId, unidadId);
        } else {
          setCarreras((prev) =>
            prev.map((c) => (c.id === carreraId ? { ...c, estado: 'COMPLETADA' } : c))
          );
          if (carrera?.unidadAsignada) {
            setUnidades((prev) =>
              prev.map((u) =>
                u.numero === carrera.unidadAsignada
                  ? { ...u, estado: 'LIBRE', carreraActualId: null }
                  : u
              )
            );
          }
        }

        soundEffects.playSuccessDispatch();
        notify('🏁 Carrera finalizada exitosamente', 'success');
      } catch (err: any) {
        notify(err.message || 'Error al completar carrera', 'alert');
      }
    },
    [carreras, notify]
  );

  // 4. Acción: Cancelar carrera
  const cancelarCarrera = useCallback(
    async (carreraId: string, motivo?: string) => {
      try {
        const carrera = carreras.find((c) => c.id === carreraId);
        const unidadId = carrera?.unidadId || undefined;

        if (isFirebaseConfigured) {
          await dispatchFirebaseService.cancelarCarrera(carreraId, motivo, unidadId);
        } else {
          setCarreras((prev) =>
            prev.map((c) =>
              c.id === carreraId
                ? { ...c, estado: 'CANCELADA', motivoCancelacion: motivo }
                : c
            )
          );
          if (carrera?.unidadAsignada) {
            setUnidades((prev) =>
              prev.map((u) =>
                u.numero === carrera.unidadAsignada
                  ? { ...u, estado: 'LIBRE', carreraActualId: null }
                  : u
              )
            );
          }
        }

        notify('🚫 Carrera cancelada', 'info');
      } catch (err: any) {
        notify(err.message || 'Error al cancelar carrera', 'alert');
      }
    },
    [carreras, notify]
  );

  // 5. Acción: Crear carrera manual (Llamada o Central)
  const crearCarreraManual = useCallback(
    async (datos: Partial<Carrera>) => {
      try {
        const clienteNombre = datos.clienteNombre || 'Cliente Telefónico';
        const clienteTelefono = datos.clienteTelefono || 'Sin número';
        const direccionTexto = datos.direccionTexto || 'Sector Central';
        const referenciaUbicacion = datos.referenciaUbicacion || undefined;

        if (isFirebaseConfigured) {
          await dispatchFirebaseService.crearCarrera({
            clienteNombre,
            clienteTelefono,
            direccionTexto,
            referenciaUbicacion,
            origenSolicitud: datos.origenSolicitud || 'PANEL_MANUAL',
          });
        } else {
          const nueva: Carrera = {
            id: `manual-${Date.now()}`,
            clienteNombre,
            clienteTelefono,
            direccionTexto,
            referenciaUbicacion: referenciaUbicacion || null,
            origenSolicitud: datos.origenSolicitud || 'PANEL_MANUAL',
            estado: 'PENDIENTE',
            creadoEn: new Date().toISOString(),
          };
          setCarreras((prev) => [nueva, ...prev]);
        }

        soundEffects.playNewRideAlert();
        notify('✅ Carrera manual registrada en el sistema', 'success');
      } catch (err: any) {
        notify(err.message || 'Error al crear carrera', 'alert');
      }
    },
    [notify]
  );

  // 6. Acción de Prueba: Generar carrera simulada de WhatsApp
  const simularCarreraWhatsApp = useCallback(async () => {
    try {
      if (isFirebaseConfigured) {
        await dispatchFirebaseService.generarCarreraPrueba();
      } else {
        const nueva: Carrera = {
          id: `sim-wa-${Date.now()}`,
          clienteNombre: 'Cliente WhatsApp Simulado',
          clienteTelefono: '593991234567',
          direccionTexto: 'Barrio Obrero - Calle 12 de Mayo y Ceslao Marín',
          referenciaUbicacion: 'Prueba rápida de despacho',
          origenSolicitud: 'WHATSAPP_TEXTO',
          estado: 'PENDIENTE',
          creadoEn: new Date().toISOString(),
        };
        setCarreras((prev) => [nueva, ...prev]);
      }
      soundEffects.playNewRideAlert();
      notify('📱 Carrera de prueba WhatsApp generada', 'alert');
    } catch (err: any) {
      notify('Error al simular carrera', 'alert');
    }
  }, [notify]);

  // 7. Acción: Cambiar estado de unidad
  const cambiarEstadoUnidad = useCallback(
    async (unidadId: string, nuevoEstado: EstadoUnidad) => {
      try {
        if (isFirebaseConfigured) {
          await dispatchFirebaseService.cambiarEstadoUnidad(unidadId, nuevoEstado);
        } else {
          setUnidades((prev) =>
            prev.map((u) => (u.id === unidadId ? { ...u, estado: nuevoEstado } : u))
          );
        }
        notify(`Estado de unidad actualizado a ${nuevoEstado}`, 'info');
      } catch (err: any) {
        notify('Error al actualizar unidad', 'alert');
      }
    },
    [notify]
  );

  return {
    isFirebase: isFirebaseConfigured,
    socketStatus: connectionStatus,
    reconnectAttempts,
    carreras,
    unidades,
    lastNotification,
    asignarCarrera,
    completarCarrera,
    cancelarCarrera,
    crearCarreraManual,
    simularCarreraWhatsApp,
    cambiarEstadoUnidad,
  };
}
