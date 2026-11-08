import { useState, FC, DragEvent } from 'react';
import {
  MapPin,
  Phone,
  ExternalLink,
  Zap,
  Check,
  X,
  ChevronDown
} from 'lucide-react';
import { Carrera, UnidadTaxi } from '@/types/dispatch.types';
import { LiveTimer } from './LiveTimer';
import { formatPhoneNumber } from '@/utils/formatters';

export interface RideCardProps {
  carrera: Carrera;
  unidadesLibres: UnidadTaxi[];
  todasLasUnidades: UnidadTaxi[];
  onAsignar: (carreraId: string, unidad: UnidadTaxi, tiempoEstimado?: number) => void;
  onCompletar: (carreraId: string) => void;
  onCancelar: (carreraId: string) => void;
}

export const RideCard: FC<RideCardProps> = ({
  carrera,
  unidadesLibres,
  todasLasUnidades,
  onAsignar,
  onCompletar,
  onCancelar
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [tiempoEstimado, setTiempoEstimado] = useState<number>(5);

  const isPendiente = carrera.estado === 'PENDIENTE';
  const isAsignada = carrera.estado === 'ASIGNADA';

  const unidadAsignada = carrera.unidadId
    ? todasLasUnidades.find((u) => u.id === carrera.unidadId)
    : undefined;

  const lat = carrera.latitud ?? carrera.origenLatitud;
  const lng = carrera.longitud ?? carrera.origenLongitud;
  const choferNombre = unidadAsignada?.conductorNombre || unidadAsignada?.choferNombre || carrera.conductorNombre || carrera.choferNombre || 'Conductor Asignado';
  const placa = unidadAsignada?.placa || carrera.unidadPlaca || '12-MAYO';
  const numUnidad = unidadAsignada?.numeroUnidad || unidadAsignada?.numero || carrera.unidadNumero || carrera.unidadAsignada || '??';

  const handleDragOver = (e: DragEvent) => {
    if (!isPendiente) return;
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    if (!isPendiente) return;
    e.preventDefault();
    setIsDragOver(false);

    try {
      const unitData = e.dataTransfer.getData('text/plain');
      if (unitData) {
        const unit: UnidadTaxi = JSON.parse(unitData);
        onAsignar(carrera.id, unit, tiempoEstimado);
      }
    } catch (err) {
      console.error('Error al soltar unidad sobre la carrera:', err);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-lg ${
        isPendiente
          ? isDragOver
            ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-500 scale-[1.01]'
            : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
          : isAsignada
          ? 'bg-slate-900/95 border-blue-500/40'
          : 'bg-slate-950/60 border-slate-800 opacity-60'
      }`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${
                isPendiente
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : isAsignada
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {carrera.estado}
            </span>

            <span className="text-[11px] font-mono text-slate-500">
              #{carrera.id.slice(-6)}
            </span>
          </div>

          <LiveTimer startTime={carrera.creadoEn} status={carrera.estado} />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-100 leading-tight">
                {carrera.direccionTexto || 'Dirección de recogida solicitada'}
              </p>
              {carrera.referenciaUbicacion && (
                <p className="text-xs text-slate-400 mt-0.5 italic">
                  Ref: {carrera.referenciaUbicacion}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">
                {carrera.clienteNombre || 'Cliente WhatsApp'}
              </span>
              <a
                href={`tel:${carrera.clienteTelefono}`}
                className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>{formatPhoneNumber(carrera.clienteTelefono)}</span>
              </a>
            </div>

            {lat && lng && (
              <a
                href={`https://www.google.com/maps?q=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-md text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Abrir ubicación en Google Maps"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {isPendiente && (
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-400 font-medium">
                Arrastra una unidad aquí o selecciona:
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Min:</span>
                <select
                  value={tiempoEstimado}
                  onChange={(e) => setTiempoEstimado(Number(e.target.value))}
                  className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded px-1.5 py-0.5 font-mono focus:outline-none"
                >
                  <option value={3}>3 min</option>
                  <option value={5}>5 min</option>
                  <option value={7}>7 min</option>
                  <option value={10}>10 min</option>
                  <option value={15}>15 min</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 hover:border-slate-600 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {unidadesLibres.length > 0
                      ? `Asignar unidad disponible (${unidadesLibres.length})`
                      : 'No hay unidades libres'}
                  </span>
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {isSelectorOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-slate-950 border border-slate-700 rounded-xl shadow-2xl p-2 z-30 max-h-48 overflow-y-auto space-y-1">
                  {unidadesLibres.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-2">
                      Sin taxis disponibles actualmente
                    </p>
                  ) : (
                    unidadesLibres.map((unit) => (
                      <button
                        key={unit.id}
                        type="button"
                        onClick={() => {
                          onAsignar(carrera.id, unit, tiempoEstimado);
                          setIsSelectorOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-slate-800 text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-emerald-400">
                            #{unit.numeroUnidad || unit.numero}
                          </span>
                          <span className="text-xs text-slate-200">
                            {unit.conductorNombre || unit.choferNombre}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {unit.placa}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => onCancelar(carrera.id)}
                className="text-xs text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
              >
                Cancelar solicitud
              </button>
            </div>
          </div>
        )}

        {isAsignada && (
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between bg-blue-950/40 border border-blue-900/60 p-2.5 rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center">
                  #{numUnidad}
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-200">
                    {choferNombre}
                  </p>
                  <p className="text-[11px] text-blue-300/80 font-mono">
                    Placa: {placa}
                  </p>
                </div>
              </div>

              {carrera.tiempoEstimadoMinutos && (
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Tiempo est.</span>
                  <span className="text-xs font-mono font-bold text-blue-300">
                    ~{carrera.tiempoEstimadoMinutos} min
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onCompletar(carrera.id)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-xl transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Completar Viaje</span>
              </button>

              <button
                type="button"
                onClick={() => onCancelar(carrera.id)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 text-xs font-bold transition-colors cursor-pointer"
                title="Cancelar carrera asignada"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideCard;
