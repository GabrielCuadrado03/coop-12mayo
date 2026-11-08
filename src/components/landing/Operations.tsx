import React from 'react';
import { motion } from 'framer-motion';
import { Radio, PhoneCall, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import operatorImg from '@/assets/image10.jpeg';

export const Operations: React.FC = () => {
  return (
    <section id="operaciones" className="py-24 bg-light-bg/50 dark:bg-dark-bg/80 transition-colors relative overflow-hidden">
      {/* Glow decorativo de fondo */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-primary/10 dark:bg-[#02913F]/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Columna de Texto e Información Operativa */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#02913F] dark:text-[#FCD00B] block mb-2">
                Infraestructura y Monitoreo Continuo
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0A2615] dark:text-white tracking-tight leading-tight">
                Central de Operaciones y Despacho 24/7
              </h2>
            </div>

            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
              Detrás de cada carrera hay un equipo humano y tecnológico que no duerme. Desde nuestra base central coordinamos en tiempo real con las <strong>87 unidades mixtas</strong> de la cooperativa mediante radiofrecuencia homologada y canal digital automatizado.
            </p>

            {/* Cuadrícula de 4 características operativas */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 shadow-sm flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#02913F]/10 dark:bg-[#FCD00B]/10 text-[#02913F] dark:text-[#FCD00B] shrink-0 mt-0.5">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0A2615] dark:text-white">Frecuencia Radial Autorizada</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">
                    Canal privado con operadoras en cabina para asignación inmediata sin cortes de señal.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 shadow-sm flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#02913F]/10 dark:bg-[#FCD00B]/10 text-[#02913F] dark:text-[#FCD00B] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0A2615] dark:text-white">Respuesta en 3 a 5 Minutos</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">
                    Unidades distribuidas por sectores estratégicos de Puyo para recogida ágil.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 shadow-sm flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#02913F]/10 dark:bg-[#FCD00B]/10 text-[#02913F] dark:text-[#FCD00B] shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0A2615] dark:text-white">Seguridad y Trazabilidad</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">
                    Choferes con credencial profesional, taxímetro homologado y número de unidad visible.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 shadow-sm flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#02913F]/10 dark:bg-[#FCD00B]/10 text-[#02913F] dark:text-[#FCD00B] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0A2615] dark:text-white">Urbano e Interparroquial</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">
                    Cobertura en todo Puyo, Shell, Mera, Fátima, Tarqui y rutas turísticas amazónicas.
                  </p>
                </div>
              </div>
            </div>

            {/* Botones de acción directa */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {/* Botón Central Fija (Rojo Oficial #DA261D) */}
              <a
                href="tel:032896860"
                className="px-6 py-3.5 rounded-full bg-[#DA261D] hover:bg-[#B91C1C] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-[#DA261D]/40 flex items-center gap-2 transition-all cursor-pointer group"
              >
                <PhoneCall className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Central Fija: (03) 289-6860</span>
              </a>

              {/* Botón WhatsApp (Amarillo Taxi #FCD00B) */}
              <a
                href="https://wa.me/593991108690?text=Hola%2C%20solicito%20un%20taxi%20de%20la%20Cooperativa%2012%20de%20Mayo"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#FCD00B] hover:bg-[#E2C81F] text-[#0A0D0B] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-[#FCD00B]/40 flex items-center gap-2 transition-all group"
              >
                <SiWhatsapp className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>WhatsApp: 099 110 8690</span>
              </a>
            </div>
          </motion.div>

          {/* Columna de Fotografía Real del Operador */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-white/10 group aspect-[4/5] bg-slate-900">
              <img
                src={operatorImg}
                alt="Operador de Radio y Despacho Cooperativa 12 de Mayo Puyo"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Degradado para legibilidad del badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badge superior: Estado en Vivo */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CABINA ACTIVA LAS 24 HORAS</span>
              </div>

              {/* Tarjeta informativa inferior */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 dark:bg-[#071A11]/95 backdrop-blur-md border border-gray-200 dark:border-[#FCD00B]/20 text-[#0A2615] dark:text-white shadow-xl">
                <p className="text-xs font-black uppercase tracking-widest text-[#02913F] dark:text-[#FCD00B]">
                  Puesto Central de Despacho
                </p>
                <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 mt-1">
                  Recepción de llamadas, coordinación radial de la flota y monitoreo de seguridad en la Amazonía.
                </p>
              </div>
            </div>

            {/* Efecto decorativo glow */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#FCD00B]/20 rounded-full blur-2xl -z-10 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Operations;
