import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Smartphone, 
  QrCode, 
  ShieldCheck, 
  MapPin, 
  Car, 
  Award, 
  CheckCircle2, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { SiGoogleplay, SiApple, SiWhatsapp } from 'react-icons/si';
import { modalProjects } from '@/data/coopData';
import iconLaDoce from '@/assets/iconlaDoce.jpeg';
import appFlyer from '@/assets/La12App.png';

export interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'app' | 'proyectos';
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'app'
}) => {
  const [activeTab, setActiveTab] = useState<'app' | 'proyectos'>(initialTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop con desenfoque suave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-5 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#0B1A12] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative border border-gray-200 dark:border-[#FCD00B]/30 flex flex-col max-h-[92vh]"
            >
              {/* Botón Cerrar */}
              <button
                onClick={onClose}
                aria-label="Cerrar modal"
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white rounded-full transition-colors z-20 cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cabecera Oficial con el Emblema Comercial iconlaDoce */}
              <div className="p-6 sm:p-7 border-b border-gray-100 dark:border-white/10 bg-gradient-to-r from-light-bg via-white to-light-bg dark:from-[#071A11] dark:via-[#0B2317] dark:to-[#071A11]">
                <div className="flex items-center gap-4">
                  {/* Emblema Oficial App La Doce */}
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1 shadow-lg ring-2 ring-[#DA261D] dark:ring-[#FCD00B] overflow-hidden flex items-center justify-center">
                      <img
                        src={iconLaDoce}
                        alt="Logo Oficial Taxi 12 La Doce"
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-[#02913F] text-white text-[9px] font-black uppercase rounded-md tracking-wider shadow">
                      App
                    </span>
                  </div>

                  {/* Textos de Cabecera */}
                  <div className="pr-8">
                    <span className="text-[#02913F] dark:text-[#FCD00B] text-xs font-black uppercase tracking-widest block mb-0.5">
                      Cooperativa de Transporte 12 de Mayo
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0A2615] dark:text-white leading-tight">
                      App Oficial "La Doce - Viaja Seguro"
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1 leading-snug">
                      Pide tu unidad mixta desde tu smartphone con monitoreo GPS en tiempo real en Puyo y Pastaza.
                    </p>
                  </div>
                </div>

                {/* Tabs de Selección */}
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => setActiveTab('app')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === 'app'
                        ? 'bg-[#DA261D] text-white shadow-md'
                        : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Descargar App y Códigos QR</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('proyectos')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === 'proyectos'
                        ? 'bg-[#02913F] text-white shadow-md'
                        : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span>Innovación y Proyectos</span>
                  </button>
                </div>
              </div>

              {/* Cuerpo del Modal con Scroll */}
              <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1">
                {activeTab === 'app' ? (
                  <>
                    {/* Sección Principal de Descarga con el Afiche Oficial La12App.png */}
                    <div className="grid md:grid-cols-12 gap-6 items-center bg-gray-50 dark:bg-white/5 p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                      {/* Flyer Oficial en Alta Calidad */}
                      <div className="md:col-span-5 flex flex-col items-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-brand-secondary/30 bg-white p-2 w-full max-w-[260px]">
                          <img
                            src={appFlyer}
                            alt="Afiche Oficial de Descarga App La Doce con Códigos QR"
                            className="w-full h-auto object-contain rounded-xl"
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mt-2 text-center flex items-center gap-1.5">
                          <QrCode className="w-3.5 h-3.5 text-[#DA261D] dark:text-[#FCD00B]" />
                          Escanea el código QR desde tu cámara
                        </span>
                      </div>

                      {/* Información y Enlaces de Descarga */}
                      <div className="md:col-span-7 space-y-4">
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#02913F]/10 dark:bg-[#FCD00B]/10 text-[#02913F] dark:text-[#FCD00B] text-xs font-bold uppercase tracking-wide mb-2">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Disponible para Android e iOS
                          </span>
                          <h4 className="text-lg font-black text-[#0A2615] dark:text-white">
                            Instala "La Doce" en 2 simples pasos
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
                            Apunta la cámara de tu teléfono al código QR del afiche para acceder a la descarga oficial en tu tienda de aplicaciones favorita:
                          </p>
                        </div>

                        {/* Botones de Tiendas de Aplicaciones */}
                        <div className="grid sm:grid-cols-2 gap-3 pt-1">
                          {/* Google Play */}
                          <div className="p-3.5 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                              <SiGoogleplay className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">
                                Disponible en
                              </p>
                              <p className="text-sm font-black text-gray-900 dark:text-white">
                                Google Play Store
                              </p>
                            </div>
                          </div>

                          {/* App Store */}
                          <div className="p-3.5 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-900 dark:text-white shrink-0">
                              <SiApple className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">
                                Disponible en
                              </p>
                              <p className="text-sm font-black text-gray-900 dark:text-white">
                                Apple App Store
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Alternativa Rápida: WhatsApp */}
                        <div className="pt-2">
                          <a
                            href="https://wa.me/593991108690?text=Hola%2C%20solicito%20un%20taxi%20de%20la%20Cooperativa%2012%20de%20Mayo%20por%20favor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 px-4 rounded-xl bg-[#FCD00B] hover:bg-[#E2C81F] text-[#0A0D0B] font-black text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2.5 transition-all group cursor-pointer"
                          >
                            <SiWhatsapp className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                            <span>¿Necesitas unidad ahora? Pide por WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Beneficios de la App */}
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#02913F] dark:text-[#FCD00B] mb-3">
                        Ventajas de Viajar con la App "La Doce"
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3.5">
                        <div className="p-3.5 rounded-xl bg-light-bg/60 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-[#02913F] dark:text-[#FCD00B] shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-bold text-xs uppercase text-gray-900 dark:text-white">
                              Rastreo Satelital en Tiempo Real
                            </h5>
                            <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
                              Visualiza en el mapa la ubicación exacta y el tiempo estimado de arribo de tu taxi.
                            </p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-light-bg/60 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 text-[#DA261D] dark:text-[#FCD00B] shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-bold text-xs uppercase text-gray-900 dark:text-white">
                              Conductor y Vehículo Homologado
                            </h5>
                            <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
                              Datos completos del chofer profesional, número de unidad oficial y placa certificada.
                            </p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-light-bg/60 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[#02913F] dark:text-[#FCD00B] shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-bold text-xs uppercase text-gray-900 dark:text-white">
                              Respuesta Rápida 24/7
                            </h5>
                            <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
                              Asignación inteligente del vehículo más cercano disponible en Puyo y Pastaza.
                            </p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-light-bg/60 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#DA261D] dark:text-[#FCD00B] shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-bold text-xs uppercase text-gray-900 dark:text-white">
                              Tarifa Justa con Taxímetro
                            </h5>
                            <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
                              Cobro transparente regulado bajo normas legales de la ANT y SEPS.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Transporte & Tecnología */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-secondary/10 rounded-xl flex items-center justify-center text-brand-primary dark:text-brand-secondary">
                          <Car className="w-5 h-5" />
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white tracking-wide uppercase">
                          Transporte y Tecnología
                        </h4>
                      </div>

                      <div className="space-y-3 pl-2">
                        {(modalProjects.transporte || []).map((project, index) => (
                          <div key={index} className="p-3.5 rounded-xl bg-light-bg/50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                            <div className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-brand-primary dark:text-brand-secondary shrink-0 mt-0.5" />
                              <div>
                                <h5 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 uppercase mb-0.5">
                                  {project.title}
                                </h5>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {project.entity}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Institucional & Social */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-secondary/10 rounded-xl flex items-center justify-center text-brand-primary dark:text-brand-secondary">
                          <Award className="w-5 h-5" />
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white tracking-wide uppercase">
                          Desarrollo Institucional y Comunitario
                        </h4>
                      </div>

                      <div className="space-y-3 pl-2">
                        {(modalProjects.institucional || []).map((project, index) => (
                          <div key={index} className="p-3.5 rounded-xl bg-light-bg/50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                            <div className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-brand-primary dark:text-brand-secondary shrink-0 mt-0.5" />
                              <div>
                                <h5 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 uppercase mb-0.5">
                                  {project.title}
                                </h5>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {project.entity}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Pie del Modal */}
              <div className="p-4 sm:p-5 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-black/20 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  Cooperativa 12 de Mayo · Puyo, Pastaza · Central Fija: (03) 289-6860
                </span>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#02913F] text-white font-bold rounded-full hover:bg-[#027533] transition-colors text-xs uppercase tracking-wider shadow-md cursor-pointer ml-auto"
                >
                  Cerrar
                </button>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectsModal;
