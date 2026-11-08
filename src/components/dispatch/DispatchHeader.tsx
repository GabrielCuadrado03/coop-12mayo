import { useState, useEffect, FC } from 'react';
import {
  Volume2,
  VolumeX,
  PlusCircle,
  Wifi,
  WifiOff,
  BellRing
} from 'lucide-react';
import { SocketStatus } from '@/types/dispatch.types';
import { soundEffects } from '@/utils/audioAlerts';

export interface DispatchHeaderProps {
  socketStatus: SocketStatus;
  reconnectAttempts: number;
  onOpenManualModal: () => void;
  pendingCount: number;
  assignedCount: number;
}

export const DispatchHeader: FC<DispatchHeaderProps> = ({
  socketStatus,
  reconnectAttempts,
  onOpenManualModal,
  pendingCount,
  assignedCount
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundEffects.setSoundEnabled(nextState);
    if (nextState) {
      soundEffects.playSuccessDispatch();
    }
  };

  const handleTestSound = () => {
    soundEffects.playNewRideAlert();
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between gap-4 shrink-0 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/50">
          12M
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-slate-100 tracking-tight flex items-center gap-1.5">
              <span>COOPERATIVA 12 DE MAYO</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PRO
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <span>Centro de Despacho Operativo</span>
            <span>•</span>
            <span className="text-slate-500">Puyo, Pastaza</span>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Solicitudes en Espera:</span>
          <span
            className={`font-mono font-bold text-sm px-2 py-0.5 rounded ${
              pendingCount > 0
                ? 'bg-rose-500 text-slate-950 animate-pulse'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            {pendingCount}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Viajes en Curso:</span>
          <span className="font-mono font-bold text-sm text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-900/50">
            {assignedCount}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="hidden sm:block text-xs font-mono font-bold text-slate-300 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
          {currentTime || '00:00:00'}
        </div>

        <div
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            socketStatus === 'CONECTADO'
              ? 'bg-emerald-950/50 text-emerald-300 border-emerald-600/60'
              : socketStatus === 'RECONECTANDO'
              ? 'bg-amber-950/50 text-amber-300 border-amber-600/60'
              : 'bg-rose-950/60 text-rose-300 border-rose-600'
          }`}
          title={
            socketStatus === 'CONECTADO'
              ? 'Conexión persistente activa con backend Socket.io'
              : `Reconectando automáticamente (intento #${reconnectAttempts})...`
          }
        >
          {socketStatus === 'CONECTADO' ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">En Vivo</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 animate-bounce" />
              <span>{socketStatus === 'RECONECTANDO' ? `Reconectando...` : 'Sin red'}</span>
            </>
          )}
        </div>

        <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={handleToggleSound}
            className={`p-1.5 rounded-md transition-colors ${
              soundEnabled
                ? 'text-emerald-400 hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
            title={soundEnabled ? 'Silenciar alertas' : 'Activar timbre sonoro'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {soundEnabled && (
            <button
              type="button"
              onClick={handleTestSound}
              className="p-1 text-[10px] text-slate-400 hover:text-emerald-300 font-semibold px-1.5 transition-colors"
              title="Probar sonido de notificación"
            >
              <BellRing className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onOpenManualModal}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-md shadow-emerald-950/40 transition-all cursor-pointer"
          title="Ingresar carrera por llamada o radio"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Nueva Carrera</span>
        </button>
      </div>
    </header>
  );
};

export default DispatchHeader;
