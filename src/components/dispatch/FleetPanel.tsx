import { useState, useMemo, FC } from 'react';
import { Search, Car, CheckCircle2, Navigation, Wrench } from 'lucide-react';
import { UnidadTaxi, FiltroFlota, EstadoUnidad } from '@/types/dispatch.types';
import { FleetUnitCard } from './FleetUnitCard';

export interface FleetPanelProps {
  unidades: UnidadTaxi[];
  onCambiarEstado: (unidadId: string, nuevoEstado: EstadoUnidad) => void;
  onSelectUnit?: (unit: UnidadTaxi) => void;
}

export const FleetPanel: FC<FleetPanelProps> = ({
  unidades,
  onCambiarEstado,
  onSelectUnit
}) => {
  const [filtro, setFiltro] = useState<FiltroFlota>('TODOS');
  const [busqueda, setBusqueda] = useState<string>('');

  const conteoLibres = useMemo(() => unidades.filter((u) => u.estado === 'LIBRE').length, [unidades]);
  const conteoEnCarrera = useMemo(() => unidades.filter((u) => u.estado === 'EN_CARRERA').length, [unidades]);
  const conteoFuera = useMemo(() => unidades.filter((u) => u.estado === 'FUERA_SERVICIO').length, [unidades]);

  const unidadesFiltradas = useMemo(() => {
    return unidades.filter((u) => {
      if (filtro === 'LIBRE' && u.estado !== 'LIBRE') return false;
      if (filtro === 'EN_CARRERA' && u.estado !== 'EN_CARRERA') return false;
      if (filtro === 'FUERA_SERVICIO' && u.estado !== 'FUERA_SERVICIO') return false;

      if (busqueda.trim()) {
        const query = busqueda.toLowerCase().trim();
        const numMatch = (u.numeroUnidad || u.numero || '').toString().includes(query);
        const nameMatch = (u.conductorNombre || u.choferNombre || '').toLowerCase().includes(query);
        const placaMatch = (u.placa || '').toLowerCase().includes(query);
        const sectorMatch = (u.sectorFrecuente || u.zonaActual || '').toLowerCase().includes(query);
        return numMatch || nameMatch || placaMatch || sectorMatch;
      }

      return true;
    });
  }, [unidades, filtro, busqueda]);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-4 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
              Flota 12 de Mayo
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            {unidades.length} unidades
          </span>
        </div>

        <div className="relative mb-3">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por # unidad, chofer o placa..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setFiltro('TODOS')}
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${
              filtro === 'TODOS'
                ? 'bg-slate-800 text-slate-100 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos ({unidades.length})
          </button>

          <button
            type="button"
            onClick={() => setFiltro('LIBRE')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              filtro === 'LIBRE'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>({conteoLibres})</span>
          </button>

          <button
            type="button"
            onClick={() => setFiltro('EN_CARRERA')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              filtro === 'EN_CARRERA'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            <Navigation className="w-3 h-3" />
            <span>({conteoEnCarrera})</span>
          </button>

          <button
            type="button"
            onClick={() => setFiltro('FUERA_SERVICIO')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              filtro === 'FUERA_SERVICIO'
                ? 'bg-slate-700 text-slate-200 shadow'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Wrench className="w-3 h-3" />
            <span>({conteoFuera})</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {unidadesFiltradas.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No se encontraron unidades con el criterio seleccionado
          </div>
        ) : (
          unidadesFiltradas.map((unit) => (
            <FleetUnitCard
              key={unit.id}
              unit={unit}
              onCambiarEstado={onCambiarEstado}
              onSelectUnit={onSelectUnit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FleetPanel;
