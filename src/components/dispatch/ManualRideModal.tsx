import { useState, useEffect, useRef, FC, FormEvent } from 'react';
import { X, Phone, User, MapPin, Navigation, Send } from 'lucide-react';
import { Carrera } from '@/types/dispatch.types';

export interface ManualRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (carrera: Omit<Carrera, 'id' | 'creadoEn' | 'actualizadoEn' | 'estado'>) => void;
}

export const ManualRideModal: FC<ManualRideModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [telefono, setTelefono] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [referencia, setReferencia] = useState('');

  const inputTelefonoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputTelefonoRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!telefono.trim() || !direccion.trim()) return;

    onSubmit({
      clienteTelefono: telefono.trim(),
      clienteNombre: nombre.trim() || 'Cliente Telefónico',
      direccionTexto: direccion.trim(),
      referenciaUbicacion: referencia.trim() || undefined,
      origenSolicitud: 'PANEL_MANUAL'
    });

    setTelefono('');
    setNombre('');
    setDireccion('');
    setReferencia('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Nueva Carrera Manual</h3>
              <p className="text-xs text-slate-400">Ingreso por llamada o radio central</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Número de Teléfono del Cliente *</span>
            </label>
            <input
              ref={inputTelefonoRef}
              type="tel"
              required
              placeholder="Ej: 0984951682 o 0991108690"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 font-mono placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nombre o Referencia del Cliente</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Lic. Marcelo Silva (opcional)"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dirección o Punto de Recogida *</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Calles Eugenio Espejo y Cacique Nayapi"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Referencia de Ubicación</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Frente al Parque Acuático Morete Puyo"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-950/50 transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Crear y Notificar Flota</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualRideModal;
