import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Smartphone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { social } from '@/data/coopData';
import { ProjectsModal } from './ProjectsModal';
import heroBg from '@/assets/image18.jpeg';

export const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden transition-colors duration-500">
      {/* Background with Real Cooperative Photo */}
      <div 
        className="absolute inset-0 bg-cover bg-[position:80%_center] md:bg-[position:center_20%] bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* MODO CLARO (Día): Luminoso, limpio, blanco marfil translúcido */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 md:via-white/75 to-transparent dark:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent dark:hidden" />

        {/* MODO OSCURO (Noche): Verde Bosque Profundo Amazónico (#071A11) */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-[#071A11] via-[#071A11]/92 md:via-[#071A11]/75 to-transparent" />
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl lg:max-w-3xl"
        >
          {/* Kicker Editorial Limpio */}
          <p className="text-xs sm:text-sm font-black tracking-[0.16em] uppercase text-[#02913F] dark:text-[#FCD00B] mb-4">
            Más de 50 Años de Confianza · Fundada en 1977
          </p>

          {/* Gran Titular: Verde oscuro en Modo Claro / Blanco puro en Modo Oscuro */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#0A2615] dark:text-white mb-6 tracking-tight leading-tight">
            LA DOCE <span className="text-[#DA261D]">.</span>
            <span className="block text-2xl sm:text-4xl md:text-5xl font-bold text-[#1B4D2E] dark:text-white/95 font-display mt-2">
              Viaja Seguro en Puyo y Pastaza
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-700 dark:text-white/90 mb-10 font-normal leading-relaxed max-w-2xl">
            Transporte público mixto líder en la Amazonía. Flota moderna de <strong className="text-[#0A2615] dark:text-white font-bold">87 unidades tipo sedán y camionetas doble cabina</strong> con choferes profesionales certificados las 24 horas.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            {/* Botón 1: WhatsApp Oficial (Amarillo Taxi #FCD00B) */}
            <a
              href="https://wa.me/593991108690?text=Hola%2C%20solicito%20un%20taxi%20de%20la%20Cooperativa%2012%20de%20Mayo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-[#FCD00B] text-[#0A0D0B] font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-[#E2C81F] shadow-xl hover:shadow-[#FCD00B]/40 transition-all flex items-center gap-2.5 group"
            >
              <SiWhatsapp className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
              <span>Pedir Taxi (099 110 8690)</span>
            </a>

            {/* Botón 2: Central Telefónica Radial */}
            <a
              href="tel:032896860"
              className="px-6 py-3.5 rounded-full bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/15 border border-gray-300 dark:border-white/20 text-[#0A2615] dark:text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#DA261D] dark:text-[#FCD00B]" />
              <span>Central: 03 289 6860</span>
            </a>

            {/* Botón 3: App La Doce (Rojo Emblema Oficial #DA261D) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-7 py-3.5 rounded-full bg-[#DA261D] hover:bg-[#B91C1C] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-[#DA261D]/40 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>App La Doce</span>
            </button>
          </div>
        </motion.div>

        {/* Floating Socials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-12 right-6 hidden md:flex items-center gap-6"
        >
          <span className="text-gray-500 dark:text-white/50 text-xs font-bold tracking-widest uppercase rotate-180 [writing-mode:vertical-lr]">
            Conéctate
          </span>
          <div className="flex flex-col gap-3">
            {social.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 shadow-md border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-800 dark:text-white hover:bg-[#FCD00B] hover:text-[#0A0D0B] dark:hover:bg-[#FCD00B] dark:hover:text-[#0A0D0B] transition-all"
                title={item.name}
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <ProjectsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
