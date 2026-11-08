import React from 'react';
import { social } from '@/data/coopData';
import logoCoop from '@/assets/logo-cooperativa.png';
import iconLaDoce from '@/assets/iconlaDoce.jpeg';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-primary dark:bg-black text-white/80 py-16 border-t border-brand-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 text-xl sm:text-2xl font-black text-white">
              {/* Ambos Emblemas Oficiales */}
              <div className="flex items-center gap-2">
                <img 
                  src={logoCoop} 
                  alt="Emblema Institucional Cooperativa 12 de Mayo" 
                  className="w-10 h-10 rounded-full object-contain ring-2 ring-[#FCD00B] bg-white p-0.5 shadow-md" 
                  title="Emblema Institucional 1977"
                />
                <img 
                  src={iconLaDoce} 
                  alt="Emblema Comercial Taxi 12 La Doce" 
                  className="w-10 h-10 rounded-full object-contain ring-2 ring-[#DA261D] bg-white p-0.5 shadow-md" 
                  title="Emblema Comercial y App Taxi 12"
                />
              </div>
              <span className="font-display">COOPERATIVA 12 DE MAYO</span>
            </div>
            <p className="text-white/70 text-sm max-w-md leading-relaxed">
              Transporte formal y seguro en taxis y camionetas mixtas. Al servicio de la ciudadanía de Puyo, 
              la provincia de Pastaza y toda la Región Amazónica del Ecuador.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.name}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-secondary hover:text-brand-primary flex items-center justify-center transition-colors text-white"
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-display">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#home" className="hover:text-brand-secondary transition-colors">Inicio</a></li>
              <li><a href="#about" className="hover:text-brand-secondary transition-colors">Nuestra Cooperativa</a></li>
              <li><a href="#skills" className="hover:text-brand-secondary transition-colors">Servicios</a></li>
              <li><a href="#operaciones" className="hover:text-brand-secondary transition-colors">Central 24/7</a></li>
              <li><a href="#projects" className="hover:text-brand-secondary transition-colors">Directiva</a></li>
              <li><a href="#galeria" className="hover:text-brand-secondary transition-colors">Galería</a></li>
              <li><a href="#contact" className="hover:text-brand-secondary transition-colors">Contacto y Sede</a></li>
            </ul>
          </div>

          {/* Legal / Meta Verification */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-display">
              Marco Legal & Meta
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="/politica-de-privacidad" className="hover:text-brand-secondary transition-colors underline">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <span className="text-xs text-white/60 block">
                  API Oficial de WhatsApp Cloud (Meta)
                </span>
              </li>
              <li>
                <span className="text-xs text-white/60 block">
                  Permiso de Operación Vigente - Puyo, Pastaza
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Cooperativa de Transporte en Taxis 12 de Mayo. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Puyo, Pastaza, Ecuador</span>
            <span>•</span>
            <span className="text-brand-secondary font-semibold">Tecnología de Despacho 24/7</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
