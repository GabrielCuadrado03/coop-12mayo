import { FC } from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

export interface ToastProps {
  notification: {
    id: string;
    message: string;
    type: 'info' | 'success' | 'alert';
  } | null;
}

export const ToastNotification: FC<ToastProps> = ({ notification }) => {
  if (!notification) return null;

  const styles = {
    info: 'bg-slate-800 text-slate-100 border-slate-700 shadow-slate-900/50',
    success: 'bg-emerald-900/90 text-emerald-100 border-emerald-600 shadow-emerald-950/50',
    alert: 'bg-rose-900/90 text-rose-100 border-rose-500 shadow-rose-950/50'
  };

  const icons = {
    info: <Info className="w-4 h-4 text-sky-400 shrink-0" />,
    success: <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />,
    alert: <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-2.5 rounded-lg border shadow-xl backdrop-blur-md animate-fade-in transition-all">
      <div className={`p-1 rounded-md ${styles[notification.type]}`}>
        {icons[notification.type]}
      </div>
      <p className="text-xs md:text-sm font-semibold tracking-wide text-slate-100">
        {notification.message}
      </p>
    </div>
  );
};

export default ToastNotification;
