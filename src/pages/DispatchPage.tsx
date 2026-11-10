import { useState, useMemo } from 'react';
import {
  Inbox,
  Navigation,
  Layers,
  Search,
  CheckCircle2,
  ArrowLeft,
  Flame,
  Zap
} from 'lucide-react';
import { useFirebaseDispatch } from '@/hooks/useFirebaseDispatch';
import {
  DispatchHeader as Header,
  RideCard,
  FleetPanel,
  ManualRideModal,
  ToastNotification
} from '@/components/dispatch';

export function DispatchPage() {
  const {
    isFirebase,
    socketStatus,
    reconnectAttempts,
    carreras,
    unidades,
    lastNotification,
    asignarCarrera,
    completarCarrera,
    cancelarCarrera,
    crearCarreraManual,
    simularCarreraWhatsApp,
    cambiarEstadoUnidad
  } = useFirebaseDispatch();

  const [activeTab, setActiveTab] = useState<'PENDIENTES' | 'EN_CURSO' | 'TODAS'>('PENDIENTES');
  const [filtroTexto, setFiltroTexto] = useState('');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const unidadesLibres = useMemo(
    () => unidades.filter((u) => u.estado === 'LIBRE'),
    [unidades]
  );

  const pendientesCount = useMemo(
    () => carreras.filter((c) => c.estado === 'PENDIENTE').length,
    [carreras]
  );

  const enCursoCount = useMemo(
    () => carreras.filter((c) => c.estado === 'ASIGNADA').length,
    [carreras]
  );

  const carrerasFiltradas = useMemo(() => {
    return carreras.filter((c) => {
      if (activeTab === 'PENDIENTES' && c.estado !== 'PENDIENTE') return false;
      if (activeTab === 'EN_CURSO' && c.estado !== 'ASIGNADA') return false;

      if (filtroTexto.trim()) {
        const query = filtroTexto.toLowerCase().trim();
        const coincideNombre = c.clienteNombre?.toLowerCase().includes(query) || false;
        const coincideTelefono = c.clienteTelefono?.toLowerCase().includes(query) || false;
        const coincideDireccion = c.direccionTexto?.toLowerCase().includes(query) || false;
        const coincideUnidad = c.unidadAsignada?.toLowerCase().includes(query) || false;
        return coincideNombre || coincideTelefono || coincideDireccion || coincideUnidad;
      }
      return true;
    });
  }, [carreras, activeTab, filtroTexto]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Barra de navegación superior con botón para regresar a la landing */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-1.5 flex items-center justify-between text-xs">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-coop-accent font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Sitio Institucional</span>
        </a>
        <div className="flex items-center gap-3">
          {/* Indicador de estado de Firebase vs Demo */}
          {isFirebase ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Firebase Firestore En Vivo</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-bold bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Modo Demostración / Esperando Claves en .env</span>
            </span>
          )}

          {/* Botón rápido para simular carrera WhatsApp */}
          <button
            type="button"
            onClick={simularCarreraWhatsApp}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] shadow transition-all cursor-pointer active:scale-95"
            title="Simula la llegada de un cliente por WhatsApp para probar el despacho y sonido"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>Simular Pedido WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Header del Dashboard de Eulalia */}
      <Header
        socketStatus={socketStatus}
        reconnectAttempts={reconnectAttempts}
        pendingCount={pendientesCount}
        assignedCount={enCursoCount}
        onOpenManualModal={() => setIsManualModalOpen(true)}
      />

      {/* Contenido Principal con Sistema Grid */}
      <main className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna Izquierda: Cola de Carreras */}
        <section className="lg:col-span-8 flex flex-col gap-4">
          {/* Barra de Filtros y Búsqueda */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-sm">
            {/* Pestañas de Estado */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveTab('PENDIENTES')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'PENDIENTES'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Pendientes</span>
                {pendientesCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 rounded-full text-[10px] font-bold animate-pulse">
                    {pendientesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('EN_CURSO')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'EN_CURSO'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>En Curso</span>
                {enCursoCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-emerald-500 text-slate-950 rounded-full text-[10px] font-bold">
                    {enCursoCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('TODAS')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'TODAS'
                    ? 'bg-slate-800 text-slate-100 border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Historial</span>
              </button>
            </div>

            {/* Input de Búsqueda Rápida */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar cliente, teléfono o dirección..."
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-coop-500 transition-colors"
              />
            </div>
          </div>

          {/* Listado de Carreras */}
          <div className="flex flex-col gap-3">
            {carrerasFiltradas.length > 0 ? (
              carrerasFiltradas.map((carrera) => (
                <RideCard
                  key={carrera.id}
                  carrera={carrera}
                  unidadesLibres={unidadesLibres}
                  todasLasUnidades={unidades}
                  onAsignar={asignarCarrera}
                  onCompletar={completarCarrera}
                  onCancelar={cancelarCarrera}
                />
              ))
            ) : (
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-slate-300">
                  No hay carreras en esta sección
                </h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  {activeTab === 'PENDIENTES'
                    ? 'Las solicitudes que los clientes envíen por WhatsApp aparecerán aquí de forma automática y con alerta sonora.'
                    : 'No se encontraron registros que coincidan con el filtro actual.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Columna Derecha: Panel de Flota de Taxis */}
        <section className="lg:col-span-4">
          <FleetPanel
            unidades={unidades}
            onCambiarEstado={cambiarEstadoUnidad}
          />
        </section>
      </main>

      {/* Modal para Crear Carrera Manualmente (Vía Teléfono o Ventanilla) */}
      <ManualRideModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        onSubmit={crearCarreraManual}
      />

      {/* Notificación Flotante Tipo Toast */}
      {lastNotification && (
        <ToastNotification notification={lastNotification} />
      )}
    </div>
  );
}

export default DispatchPage;
