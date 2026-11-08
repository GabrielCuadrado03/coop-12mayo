import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';
import {
  Header,
  Hero,
  About,
  Skills,
  Operations,
  Projects,
  Gallery,
  Blog,
  Contact,
  Footer
} from '@/components/landing';

export const LandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 selection:bg-primary/30 relative">
      {/* Barra de progreso de lectura superior */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-secondary z-[60] origin-left" style={{ scaleX }} />
      
      <Header />
      
      <main>
        {/* 1. Portada Oficial */}
        <Hero />

        {/* 2. Identidad y Pilares Institucionales */}
        <About />

        {/* 3. Servicios y Modalidades de Transporte */}
        <Skills />

        {/* 4. Central de Operaciones y Despacho 24/7 (Opción 1) */}
        <Operations />

        {/* 5. Directiva Oficial 2026-2027 */}
        <Projects />

        {/* 6. Galería de Vida Cooperativa, Deportes y Familia (Opción 2) */}
        <Gallery />

        {/* 7. Novedades y Actualidad */}
        <Blog />

        {/* 8. Contacto Oficial (Ubicado al final antes del Footer) */}
        <Contact />
      </main>

      <Footer />

      {/* Botón Flotante Fijo de WhatsApp */}
      <a
        href="https://wa.me/593991108690?text=Hola%2C%20solicito%20un%20taxi%20de%20la%20Cooperativa%2012%20de%20Mayo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
      >
        <SiWhatsapp className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
};

export default LandingPage;
