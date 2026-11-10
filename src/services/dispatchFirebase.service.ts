// ========================================================
// Servicio de Despacho en Tiempo Real con Firebase Firestore
// Cooperativa de Transportes 12 de Mayo - Puyo, Pastaza
// ========================================================

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Unsubscribe,
  Timestamp
} from 'firebase/firestore';
import { db, COLLECTIONS, isFirebaseConfigured } from './firebase';
import { Carrera, UnidadTaxi, EstadoCarrera, EstadoUnidad } from '../types/dispatch.types';
import { INITIAL_TAXI_FLEET } from '../utils/initialFleet';

/**
 * Convierte un Timestamp o fecha de Firestore a formato ISO String
 */
function parseFirestoreDate(val: any): string {
  if (!val) return new Date().toISOString();
  if (val instanceof Timestamp) return val.toDate().toISOString();
  if (val?.toDate && typeof val.toDate === 'function') return val.toDate().toISOString();
  if (typeof val === 'string') return val;
  return new Date().toISOString();
}

/**
 * Transforma un documento de Firestore a la interfaz de Carrera
 */
function mapDocToCarrera(docId: string, data: any): Carrera {
  return {
    id: docId,
    clienteTelefono: data.clienteTelefono || 'Sin número',
    clienteNombre: data.clienteNombre || 'Cliente WhatsApp',
    direccionTexto: data.direccionTexto || data.origenDireccion || 'Sector Puyo Centro',
    referenciaUbicacion: data.referenciaUbicacion || null,
    origenLatitud: data.origenLatitud ?? null,
    origenLongitud: data.origenLongitud ?? null,
    latitud: data.latitud ?? data.origenLatitud ?? null,
    longitud: data.longitud ?? data.origenLongitud ?? null,
    urlGoogleMaps: data.urlGoogleMaps || (data.origenLatitud && data.origenLongitud ? `https://www.google.com/maps?q=${data.origenLatitud},${data.origenLongitud}` : null),
    estado: (data.estado as EstadoCarrera) || 'PENDIENTE',
    unidadId: data.unidadId || null,
    unidadNumero: data.unidadNumero || data.unidadAsignada || null,
    unidadAsignada: data.unidadAsignada || data.unidadNumero || null,
    unidadPlaca: data.unidadPlaca || null,
    choferNombre: data.choferNombre || data.conductorNombre || null,
    conductorNombre: data.conductorNombre || data.choferNombre || null,
    choferTelefono: data.choferTelefono || null,
    origenSolicitud: data.origenSolicitud || 'WHATSAPP_TEXTO',
    creadoEn: parseFirestoreDate(data.creadoEn || data.createdAt),
    actualizadoEn: parseFirestoreDate(data.actualizadoEn || data.updatedAt),
  };
}

/**
 * Transforma un documento de Firestore a la interfaz de UnidadTaxi
 */
function mapDocToUnidad(docId: string, data: any): UnidadTaxi {
  return {
    id: docId,
    numero: String(data.numero || data.numeroUnidad || '00').padStart(2, '0'),
    numeroUnidad: data.numeroUnidad || data.numero,
    choferNombre: data.choferNombre || data.conductorNombre || 'Socio Conductor',
    conductorNombre: data.conductorNombre || data.choferNombre || 'Socio Conductor',
    choferTelefono: data.choferTelefono || '',
    placa: data.placa || 'PBA-0000',
    estado: (data.estado as EstadoUnidad) || 'LIBRE',
    tipoVehiculo: data.tipoVehiculo || 'SEDAN',
    zonaActual: data.zonaActual || data.sectorActual || 'Parada Central',
    carreraActualId: data.carreraActualId || null,
    actualizadoEn: parseFirestoreDate(data.actualizadoEn),
  };
}

export const dispatchFirebaseService = {
  /**
   * Suscribe en tiempo real a la colección de carreras activas
   */
  subscribeToCarreras(onUpdate: (carreras: Carrera[]) => void, onError?: (err: Error) => void): Unsubscribe {
    if (!isFirebaseConfigured) {
      console.warn('⚠️ Firebase no configurado aún en .env. Usando modo demostración.');
      return () => {};
    }

    try {
      const carrerasQuery = query(
        collection(db, COLLECTIONS.CARRERAS),
        orderBy('creadoEn', 'desc'),
        limit(50)
      );

      return onSnapshot(
        carrerasQuery,
        (snapshot) => {
          const carreras = snapshot.docs.map((docSnap) =>
            mapDocToCarrera(docSnap.id, docSnap.data())
          );
          onUpdate(carreras);
        },
        (error) => {
          console.error('❌ Error escuchando carreras en Firestore:', error);
          if (onError) onError(error);
        }
      );
    } catch (err) {
      console.error('❌ Excepción al suscribir a carreras:', err);
      return () => {};
    }
  },

  /**
   * Suscribe en tiempo real a la colección de unidades (Flota)
   */
  subscribeToUnidades(onUpdate: (unidades: UnidadTaxi[]) => void, onError?: (err: Error) => void): Unsubscribe {
    if (!isFirebaseConfigured) {
      onUpdate(INITIAL_TAXI_FLEET);
      return () => {};
    }

    try {
      const unidadesQuery = query(
        collection(db, COLLECTIONS.UNIDADES),
        orderBy('numero', 'asc')
      );

      return onSnapshot(
        unidadesQuery,
        (snapshot) => {
          if (snapshot.empty) {
            // Si la colección está vacía en Firestore, autosembramos la flota inicial
            dispatchFirebaseService.seedInitialFleet().catch(console.error);
            onUpdate(INITIAL_TAXI_FLEET);
            return;
          }

          const unidades = snapshot.docs.map((docSnap) =>
            mapDocToUnidad(docSnap.id, docSnap.data())
          );
          onUpdate(unidades);
        },
        (error) => {
          console.error('❌ Error escuchando unidades en Firestore:', error);
          if (onError) onError(error);
        }
      );
    } catch (err) {
      console.error('❌ Excepción al suscribir a unidades:', err);
      return () => {};
    }
  },

  /**
   * Crea una nueva carrera en Firestore (vía WhatsApp o Ingreso Manual)
   */
  async crearCarrera(datos: {
    clienteNombre: string;
    clienteTelefono: string;
    direccionTexto: string;
    referenciaUbicacion?: string;
    origenSolicitud?: 'WHATSAPP_TEXTO' | 'WHATSAPP_UBICACION' | 'PANEL_MANUAL';
  }): Promise<string> {
    if (!isFirebaseConfigured) {
      return `demo-${Date.now()}`;
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.CARRERAS), {
      clienteNombre: datos.clienteNombre,
      clienteTelefono: datos.clienteTelefono,
      direccionTexto: datos.direccionTexto,
      referenciaUbicacion: datos.referenciaUbicacion || null,
      origenSolicitud: datos.origenSolicitud || 'PANEL_MANUAL',
      estado: 'PENDIENTE',
      unidadId: null,
      unidadAsignada: null,
      creadoEn: serverTimestamp(),
      actualizadoEn: serverTimestamp(),
    });

    return docRef.id;
  },

  /**
   * Asigna una unidad a una carrera pendiente
   */
  async asignarCarrera(carreraId: string, unidad: UnidadTaxi): Promise<void> {
    if (!isFirebaseConfigured) return;

    // 1. Actualizar estado de la carrera
    const carreraRef = doc(db, COLLECTIONS.CARRERAS, carreraId);
    await updateDoc(carreraRef, {
      estado: 'ASIGNADA',
      unidadId: unidad.id,
      unidadAsignada: unidad.numero,
      unidadPlaca: unidad.placa,
      choferNombre: unidad.choferNombre || unidad.conductorNombre,
      actualizadoEn: serverTimestamp(),
    });

    // 2. Actualizar estado de la unidad a EN_CARRERA
    if (unidad.id) {
      const unidadRef = doc(db, COLLECTIONS.UNIDADES, unidad.id);
      await updateDoc(unidadRef, {
        estado: 'EN_CARRERA',
        carreraActualId: carreraId,
        actualizadoEn: serverTimestamp(),
      });
    }
  },

  /**
   * Marca una carrera como completada
   */
  async completarCarrera(carreraId: string, unidadId?: string): Promise<void> {
    if (!isFirebaseConfigured) return;

    const carreraRef = doc(db, COLLECTIONS.CARRERAS, carreraId);
    await updateDoc(carreraRef, {
      estado: 'COMPLETADA',
      actualizadoEn: serverTimestamp(),
    });

    if (unidadId) {
      const unidadRef = doc(db, COLLECTIONS.UNIDADES, unidadId);
      await updateDoc(unidadRef, {
        estado: 'LIBRE',
        carreraActualId: null,
        actualizadoEn: serverTimestamp(),
      });
    }
  },

  /**
   * Cancela una carrera
   */
  async cancelarCarrera(carreraId: string, motivo?: string, unidadId?: string): Promise<void> {
    if (!isFirebaseConfigured) return;

    const carreraRef = doc(db, COLLECTIONS.CARRERAS, carreraId);
    await updateDoc(carreraRef, {
      estado: 'CANCELADA',
      motivoCancelacion: motivo || 'Cancelada por operadora o usuario',
      actualizadoEn: serverTimestamp(),
    });

    if (unidadId) {
      const unidadRef = doc(db, COLLECTIONS.UNIDADES, unidadId);
      await updateDoc(unidadRef, {
        estado: 'LIBRE',
        carreraActualId: null,
        actualizadoEn: serverTimestamp(),
      });
    }
  },

  /**
   * Cambia manualmente el estado de una unidad de taxi
   */
  async cambiarEstadoUnidad(unidadId: string, nuevoEstado: EstadoUnidad): Promise<void> {
    if (!isFirebaseConfigured) return;

    const unidadRef = doc(db, COLLECTIONS.UNIDADES, unidadId);
    await updateDoc(unidadRef, {
      estado: nuevoEstado,
      actualizadoEn: serverTimestamp(),
    });
  },

  /**
   * Inicializa la flota base en Firestore si está vacía
   */
  async seedInitialFleet(): Promise<void> {
    if (!isFirebaseConfigured) return;

    try {
      const snap = await getDocs(collection(db, COLLECTIONS.UNIDADES));
      if (!snap.empty) return;

      console.log('🌱 Inicializando flota de 87 unidades en Firestore...');
      for (const u of INITIAL_TAXI_FLEET) {
        await addDoc(collection(db, COLLECTIONS.UNIDADES), {
          numero: u.numero,
          choferNombre: u.choferNombre || u.conductorNombre,
          choferTelefono: u.choferTelefono || '',
          placa: u.placa,
          estado: u.estado,
          tipoVehiculo: Number(u.numero) > 70 ? 'CAMIONETA' : 'SEDAN',
          zonaActual: u.zonaActual || 'Puyo Central',
          creadoEn: serverTimestamp(),
          actualizadoEn: serverTimestamp(),
        });
      }
      console.log('✅ Flota inicial de Cooperativa 12 de Mayo sembrada exitosamente.');
    } catch (err) {
      console.error('❌ Error sembrando flota inicial:', err);
    }
  },

  /**
   * Simula una carrera entrante de prueba por WhatsApp
   */
  async generarCarreraPrueba(): Promise<string> {
    const sectoresPuyo = [
      'Barrio Obrero - Calle 12 de Mayo y Ceslao Marín',
      'Hospital Puyo - Puerta de Emergencias',
      'Terminal Terrestre de Puyo - Andén 3',
      'Mercado Mariscal - Av. Alberto Zambrano',
      'Barrio México - Calle González Suárez',
      'Paso Lateral Shell - Entrada a Fátima',
      'Parque Central 12 de Mayo frente al Municipio',
    ];

    const nombres = [
      'María Elena Tanguila',
      'Ing. Marcelo Villalba',
      'Dra. Carmen Solís',
      'Sr. Franklin Guaminga',
      'Lcda. Patricia Vargas',
      'Don Byron Paredes',
    ];

    const sectorRandom = sectoresPuyo[Math.floor(Math.random() * sectoresPuyo.length)];
    const nombreRandom = nombres[Math.floor(Math.random() * nombres.length)];
    const telefonoRandom = `5939${Math.floor(10000000 + Math.random() * 90000000)}`;

    return await this.crearCarrera({
      clienteNombre: nombreRandom,
      clienteTelefono: telefonoRandom,
      direccionTexto: sectorRandom,
      referenciaUbicacion: 'Solicitud enviada vía WhatsApp oficial',
      origenSolicitud: 'WHATSAPP_TEXTO',
    });
  }
};
