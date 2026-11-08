import { create } from 'zustand';
import {
  Carrera,
  UnidadTaxi,
  SocketStatus,
  FiltroFlota,
  EstadoUnidad
} from '../types/dispatch.types';

export interface DispatchNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'alert';
}

interface DispatchState {
  carreras: Carrera[];
  unidades: UnidadTaxi[];
  socketStatus: SocketStatus;
  reconnectAttempts: number;
  activeTab: 'PENDIENTES' | 'EN_CURSO' | 'TODAS';
  filtroFlota: FiltroFlota;
  busquedaTexto: string;
  soundEnabled: boolean;
  notification: DispatchNotification | null;

  setCarreras: (carreras: Carrera[]) => void;
  addCarrera: (carrera: Carrera) => void;
  updateCarrera: (carrera: Carrera) => void;
  setUnidades: (unidades: UnidadTaxi[]) => void;
  cambiarEstadoUnidad: (unidadId: string, nuevoEstado: EstadoUnidad) => void;
  setSocketStatus: (status: SocketStatus, attempts?: number) => void;
  setActiveTab: (tab: 'PENDIENTES' | 'EN_CURSO' | 'TODAS') => void;
  setFiltroFlota: (filtro: FiltroFlota) => void;
  setBusquedaTexto: (texto: string) => void;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  showNotification: (message: string, type?: 'info' | 'success' | 'alert') => void;
  clearNotification: () => void;
}

export const useDispatchStore = create<DispatchState>((set) => ({
  carreras: [],
  unidades: [],
  socketStatus: 'RECONECTANDO',
  reconnectAttempts: 0,
  activeTab: 'PENDIENTES',
  filtroFlota: 'TODOS',
  busquedaTexto: '',
  soundEnabled: true,
  notification: null,

  setCarreras: (carreras) => set({ carreras }),

  addCarrera: (nuevaCarrera) =>
    set((state) => {
      if (state.carreras.some((c) => c.id === nuevaCarrera.id)) {
        return state;
      }
      return { carreras: [nuevaCarrera, ...state.carreras] };
    }),

  updateCarrera: (carreraActualizada) =>
    set((state) => ({
      carreras: state.carreras.map((c) =>
        c.id === carreraActualizada.id ? { ...c, ...carreraActualizada } : c
      )
    })),

  setUnidades: (unidades) => set({ unidades }),

  cambiarEstadoUnidad: (unidadId, nuevoEstado) =>
    set((state) => ({
      unidades: state.unidades.map((u) =>
        u.id === unidadId
          ? {
              ...u,
              estado: nuevoEstado,
              carreraActualId: nuevoEstado !== 'EN_CARRERA' ? null : u.carreraActualId,
              actualizadoEn: new Date().toISOString()
            }
          : u
      )
    })),

  setSocketStatus: (socketStatus, reconnectAttempts = 0) =>
    set({ socketStatus, reconnectAttempts }),

  setActiveTab: (activeTab) => set({ activeTab }),

  setFiltroFlota: (filtroFlota) => set({ filtroFlota }),

  setBusquedaTexto: (busquedaTexto) => set({ busquedaTexto }),

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),

  showNotification: (message, type = 'info') =>
    set({
      notification: {
        id: Math.random().toString(),
        message,
        type
      }
    }),

  clearNotification: () => set({ notification: null })
}));
