import { useState, useEffect, FC } from 'react';
import { Clock } from 'lucide-react';
import { calculateElapsedSeconds, formatElapsedSeconds } from '@/utils/formatters';

export interface LiveTimerProps {
  startTime: string | Date;
  status: 'PENDIENTE' | 'ASIGNADA' | 'COMPLETADA' | 'CANCELADA';
}

export const LiveTimer: FC<LiveTimerProps> = ({ startTime, status }) => {
  const [seconds, setSeconds] = useState(() => calculateElapsedSeconds(startTime));

  useEffect(() => {
    if (status === 'COMPLETADA' || status === 'CANCELADA') return;

    const interval = setInterval(() => {
      setSeconds(calculateElapsedSeconds(startTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, status]);

  let badgeStyle = 'bg-emerald-950/50 text-emerald-300 border-emerald-700/60';
  let isCritical = false;

  if (status === 'PENDIENTE') {
    if (seconds >= 240) {
      badgeStyle = 'bg-rose-950/70 text-rose-300 border-rose-500 animate-pulse';
      isCritical = true;
    } else if (seconds >= 120) {
      badgeStyle = 'bg-amber-950/60 text-amber-300 border-amber-600/70';
    }
  } else {
    badgeStyle = 'bg-blue-950/50 text-blue-300 border-blue-700/60';
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold border tracking-wider shadow-sm ${badgeStyle}`}
      title={isCritical ? '¡Alerta! Tiempo de espera prolongado' : 'Tiempo transcurrido'}
    >
      <Clock className={`w-3.5 h-3.5 ${isCritical ? 'animate-spin' : ''}`} />
      <span>{formatElapsedSeconds(seconds)}</span>
      {isCritical && <span className="text-[10px] uppercase font-bold tracking-tight ml-0.5">Urgente</span>}
    </div>
  );
};

export default LiveTimer;
