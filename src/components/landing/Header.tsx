import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation } from '@/data/coopData';
import { useDarkMode } from '@/hooks/useDarkMode';
import logoCoop from '@/assets/logo-cooperativa.png';
import iconLaDoce from '@/assets/iconlaDoce.jpeg';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useDarkMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3.5 bg-white/95 dark:bg-[#071A11]/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-[#FCD00B]/20' 
        : 'py-5 bg-gradient-to-b from-white/90 via-white/40 to-transparent dark:from-black/60 dark:via-black/20 dark:to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logos Oficiales: Institucional 1977 + Comercial Taxi 12 */}
        <motion.a 
          href="#home" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
        >
          {/* Ambos emblemas oficiales con alto valor institucional y comercial */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* 1. Emblema Institucional Histórico (1977) */}
            <img 
              src={logoCoop} 
              alt="Emblema Institucional Cooperativa 12 de Mayo" 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-contain shadow-md ring-2 ring-[#FCD00B] bg-white p-0.5 shrink-0 group-hover:scale-105 transition-transform" 
              title="Emblema Institucional (Fundada en 1977)"
            />

            {/* 2. Emblema Comercial Taxi 12 - App La Doce */}
            <img 
              src={iconLaDoce} 
              alt="Emblema Comercial Taxi 12 La Doce" 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-contain shadow-md ring-2 ring-[#DA261D] bg-white p-0.5 shrink-0 group-hover:scale-105 transition-transform" 
              title="Emblema Comercial Taxi 12 - App La Doce"
            />
          </div>

          {/* Nombre Oficial Institucional */}
          <span className="font-display font-black tracking-wide text-base sm:text-lg lg:text-xl text-[#0A2615] dark:text-white whitespace-nowrap leading-none inline-flex items-baseline">
            12 DE MAYO<span className="text-[#DA261D] font-black inline">.</span>
          </span>
        </motion.a>

        {/* Desktop Nav - Totalmente limpio, espacioso y corporativo */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 shrink-0 ml-auto">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs xl:text-sm font-semibold transition-colors text-gray-800 hover:text-[#02913F] dark:text-gray-200 dark:hover:text-[#FCD00B] whitespace-nowrap px-1 py-1"
            >
              {item.name}
            </a>
          ))}

          {/* Theme Toggle con Tooltip Flotante Elegante */}
          <div className="relative group/theme shrink-0 ml-2">
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Alternar modo claro u oscuro"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all border border-gray-300 dark:border-white/15 text-gray-700 dark:text-[#FCD00B] cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95 shadow-sm"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#FCD00B] transition-transform duration-300 group-hover/theme:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-gray-800 transition-transform duration-300 group-hover/theme:-rotate-12" />
              )}
            </button>

            {/* Globo Tooltip Flotante */}
            <div className="absolute top-full right-0 mt-2.5 pointer-events-none opacity-0 invisible group-hover/theme:opacity-100 group-hover/theme:visible transition-all duration-200 transform translate-y-1 group-hover/theme:translate-y-0 z-50">
              <div className="bg-[#0A2615] dark:bg-white text-white dark:text-[#0A2615] text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-2xl whitespace-nowrap flex items-center gap-1.5 border border-white/10 dark:border-gray-200">
                <span>{isDark ? '☀️ Cambiar a Modo Claro' : '🌙 Cambiar a Modo Oscuro'}</span>
              </div>
              {/* Puntero triangular */}
              <div className="w-2 h-2 bg-[#0A2615] dark:bg-white rotate-45 absolute -top-1 right-3.5" />
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Buttons */}
        <div className="flex lg:hidden items-center gap-2.5 shrink-0">
          <button 
            onClick={() => setIsDark(!isDark)} 
            aria-label="Toggle theme" 
            className="p-2 text-gray-800 dark:text-white border border-gray-300 dark:border-white/15 rounded-lg"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#FCD00B]" /> : <Moon className="w-4 h-4 text-gray-800" />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Menu" 
            className="p-2 text-gray-800 dark:text-white border border-gray-300 dark:border-white/15 rounded-lg"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white/98 dark:bg-[#071A11]/98 backdrop-blur-xl p-6 lg:hidden border-t border-gray-200 dark:border-[#FCD00B]/20 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {/* Cabecera del Menú Móvil con Ambos Emblemas */}
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-1.5">
                  <img 
                    src={logoCoop} 
                    alt="Emblema Institucional" 
                    className="w-9 h-9 rounded-full object-contain shadow-md ring-2 ring-[#FCD00B] bg-white p-0.5" 
                  />
                  <img 
                    src={iconLaDoce} 
                    alt="Emblema Comercial" 
                    className="w-9 h-9 rounded-full object-contain shadow-md ring-2 ring-[#DA261D] bg-white p-0.5" 
                  />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-[#0A2615] dark:text-white inline-flex items-baseline">
                    12 DE MAYO<span className="text-[#DA261D] font-black inline">.</span>
                  </h4>
                </div>
              </div>

              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-bold text-gray-900 dark:text-white hover:text-[#02913F] dark:hover:text-[#FCD00B]"
                >
                  {item.name}
                </a>
              ))}
              {/* Acciones del Menú Móvil */}
              <div className="pt-3 border-t border-gray-200 dark:border-white/10 space-y-2.5">
                {/* Botón horizontal completo con texto para alternar tema */}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="w-full p-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 text-gray-800 dark:text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-colors border border-gray-200 dark:border-white/10 cursor-pointer"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-4 h-4 text-[#FCD00B]" />
                      <span>Cambiar a Modo Claro (Día)</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-gray-800 dark:text-[#FCD00B]" />
                      <span>Cambiar a Modo Oscuro (Noche)</span>
                    </>
                  )}
                </button>

                {/* Botón WhatsApp */}
                <a
                  href="https://wa.me/593991108690?text=Hola%2C%20solicito%20un%20taxi%20de%20la%20Cooperativa%2012%20de%20Mayo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3 rounded-xl bg-[#FCD00B] hover:bg-[#E2C81F] text-[#0A0D0B] font-black text-center uppercase tracking-wider text-sm shadow-md block transition-colors"
                >
                  Pedir por WhatsApp (099 110 8690)
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
