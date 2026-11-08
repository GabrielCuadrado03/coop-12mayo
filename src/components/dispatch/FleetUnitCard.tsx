import { FC, DragEvent } from 'react';
import { Phone, MapPin, Wrench, Navigation } from 'lucide-react';
import { UnidadTaxi, EstadoUnidad } from '@/types/dispatch.types';
import { formatPhoneNumber } from '@/utils/formatters';

export interface FleetUnitCardProps {
  unit: UnidadTaxi;
  onCambiarEstado: (unidadId: string, nuevoEstado: EstadoUnidad) => void;
  onSelectUnit?: (unit: UnidadTaxi) => void;
}

export const FleetUnitCard: FC<FleetUnitCardProps> = ({
  unit,
  onCambiarEstado,
  onSelectUnit
}) => {
  const isLibre = unit.estado === 'LIBRE';
  const isEnCarrera = unit.estado === 'EN_CARRERA';
  const isFuera = unit.estado === 'FUERA_SERVICIO';

  const handleDragStart = (e: DragEvent) => {
    if (!isLibre) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', JSON.stringify(unit));
  };

  const nombreChofer = unit.conductorNombre || unit.choferNombre || 'Chofer Profesional';
  const telefonoChofer = unit.conductorTelefono || unit.choferTelefono;
  const numVisual = unit.numeroUnidad || unit.numero || '??';
  const sector = unit.sectorFrecuente || unit.zonaActual || 'Puyo Centro';

  return (
    <div
      draggable={isLibre}
      onDragStart={handleDragStart}
      className={`relative p-3 rounded-xl border transition-all duration-150 select-none ${
        isLibre
          ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-950/40 cursor-grab active:cursor-grabbing'
          : isEnCarrera
          ? 'bg-slate-900/60 border-amber-500/30 opacity-90'
          : 'bg-slate-950/70 border-slate-800 opacity-60'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-lg font-mono font-black text-lg shadow-inner ${
              isLibre
                ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400/50'
                : isEnCarrera
                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400/50'
                : 'bg-slate-800 text-slate-400 ring-1 ring-slate-700'
            }`}
          >
            #{numVisual}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5 leading-tight">
              <span>{nombreChofer}</span>
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] font-mono text-slate-400 font-medium">
                {unit.placa}
              </span>
              <span className="text-slate-600 text-[10px]">•</span>
              <span className="text-[10px] text-slate-400">{unit.modeloVehiculo || 'Sedán Mixto'}</span>
            </div>
          </div>
        </div>

        {unit.tipoVehiculo === 'CAMIONETA' && (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
            CAMIONETA
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-1 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 mb-2.5">
        <div className="flex items-center gap-1 truncate" title={sector}>
          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
          <span className="truncate">{sector}</span>
        </div>
        {telefonoChofer && (
          <a
            href={`tel:${telefonoChofer}`}
            className="flex items-center gap-1 font-mono text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
            title="Llamar conductor"
          >
            <Phone className="w-3 h-3 text-slate-500" />
            <span>{formatPhoneNumber(telefonoChofer)}</span>
          </a>
        )}
      </div>

      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          {isLibre && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Disponible
            </span>
          )}
          {isEnCarrera && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
              <Navigation className="w-3 h-3 animate-pulse" />
              Ocupada
            </span>
          )}
          {isFuera && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              <Wrench className="w-3 h-3" />
              Inactivo
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {isLibre ? (
            <button
              type="button"
              onClick={() => onCambiarEstado(unit.id, 'FUERA_SERVICIO')}
              className="px-2 py-1 rounded text-[10px] font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-900/60 transition-colors cursor-pointer"
              title="Poner fuera de servicio"
            >
              Pausar
            </button>
          ) : isFuera ? (
            <button
              type="button"
              onClick={() => onCambiarEstado(unit.id, 'LIBRE')}
              className="px-2 py-1 rounded text-[10px] font-bold text-emerald-400 hover:bg-emerald-950/60 border border-emerald-800/60 transition-colors cursor-pointer"
              title="Reactivar y marcar como disponible"
            >
              Habilitar
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onCambiarEstado(unit.id, 'LIBRE')}
              className="px-2 py-1 rounded text-[10px] font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
              title="Liberar unidad manualmente si ya culminó"
            >
              Liberar
            </button>
          )}

          {isLibre && onSelectUnit && (
            <button
              type="button"
              onClick={() => onSelectUnit(unit)}
              className="px-2 py-1 rounded text-[10px] font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
              title="Asignar rápidamente a la primera carrera en espera"
            >
              Asignar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FleetUnitCard;
