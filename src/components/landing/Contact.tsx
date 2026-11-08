import React, { useRef, useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, PhoneCall } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import emailjs from '@emailjs/browser';
import { Button, Input, Textarea } from '@/ui';
import { contactInfo } from '@/data/coopData';
import image3 from '@/assets/image14.jpeg';

export const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ loading: boolean; success: boolean | null; error: string | null }>({
    loading: false,
    success: null,
    error: null
  });

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus({ loading: true, success: null, error: null });

    const SERVICE_ID = 'service_xxxxxx';
    const TEMPLATE_ID = 'template_xxxxxx';
    const PUBLIC_KEY = 'your_public_key';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setStatus({ loading: false, success: true, error: null });
        form.current?.reset();
      }, (error) => {
        setStatus({ loading: false, success: false, error: error?.text || 'No se pudo enviar el correo en este momento' });
      });
  };

  return (
    <section id="contact" className="py-24 bg-light-bg dark:bg-dark-bg transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Info Sidebar */}
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="aspect-video w-full sm:w-64 rounded-2xl overflow-hidden shadow-xl border border-brand-secondary/20"
              >
                <img src={image3} alt="Central Cooperativa 12 de Mayo" className="w-full h-full object-cover" />
              </motion.div>
              <span className="text-brand-secondary text-xs sm:text-sm font-bold uppercase tracking-widest block">
                Atención 24/7 en Puyo y Pastaza
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white leading-tight">
                Contáctanos y Pide tu Unidad
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                Estamos a tu servicio los 365 días del año. Solicita tu taxi o camioneta doble cabina de inmediato por WhatsApp, llamada a central o visítanos en nuestra sede.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* WhatsApp Oficial */}
              <a 
                href="https://wa.me/593991108690?text=Hola%2C%20solicito%20un%20taxi%20de%20la%20Cooperativa%2012%20de%20Mayo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-5 bg-white dark:bg-dark-card text-gray-900 dark:text-white rounded-2xl flex items-start gap-4 border border-brand-secondary/30 shadow-md hover:border-brand-secondary hover:shadow-lg transition-all group"
              >
                <SiWhatsapp className="w-6 h-6 shrink-0 text-[#25D366] group-hover:scale-110 transition-transform mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                    WhatsApp Despacho: 099 110 8690
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Línea alternativa: 098 495 1682 · Pedidos directos 24 horas
                  </p>
                </div>
              </a>

              {/* Teléfono Fijo Central */}
              <a 
                href="tel:032896860" 
                className="p-5 bg-white dark:bg-dark-card text-gray-900 dark:text-white rounded-2xl flex items-start gap-4 border border-gray-100 dark:border-brand-secondary/20 shadow-md hover:border-brand-primary transition-all group"
              >
                <PhoneCall className="w-6 h-6 shrink-0 text-brand-primary dark:text-brand-secondary group-hover:scale-110 transition-transform mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                    Central Radial: 03 289 6860
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    Operadoras de despacho en frecuencia continua
                  </p>
                </div>
              </a>

              {/* Ubicación Oficial */}
              <div className="p-5 bg-white dark:bg-dark-card text-gray-900 dark:text-white rounded-2xl flex items-start gap-4 border border-gray-100 dark:border-brand-secondary/20 shadow-md">
                <MapPin className="w-6 h-6 shrink-0 text-brand-secondary mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                    Sede y Parada Principal
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                    {contactInfo.location}
                  </p>
                </div>
              </div>

              {/* Correo Electrónico Institucional */}
              <div className="p-5 bg-white dark:bg-dark-card text-gray-900 dark:text-white rounded-2xl flex items-start gap-4 border border-gray-100 dark:border-brand-secondary/20 shadow-md">
                <Mail className="w-6 h-6 shrink-0 text-brand-secondary mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                    Correo Electrónico
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {contactInfo.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3 bg-white dark:bg-dark-card p-8 sm:p-10 rounded-3xl shadow-xl dark:shadow-black/30 border border-gray-100 dark:border-brand-secondary/20">
            <div className="mb-6">
              <span className="text-brand-secondary text-xs font-bold uppercase tracking-widest block mb-1">
                Buzón Institucional
              </span>
              <h3 className="text-2xl font-bold dark:text-white">
                Envíanos tu Mensaje o Consulta
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                Para convenios corporativos, información de flota, encomiendas o sugerencias ciudadanas.
              </p>
            </div>

            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <Input label="Nombres y Apellidos*" name="user_name" placeholder="Ej. Juan Pérez" required />
                <Input label="Teléfono o WhatsApp*" name="user_phone" placeholder="Ej. 0991234567" required />
              </div>
              <Input label="Correo Electrónico*" type="email" name="user_email" placeholder="ejemplo@correo.com" required />
              <Input label="Motivo del Mensaje" name="subject" placeholder="Servicio corporativo, consulta, etc." />
              <Textarea label="Detalle de su Mensaje*" name="message" placeholder="Escriba aquí los detalles de su requerimiento..." required />
              
              <Button type="submit" disabled={status.loading} className="w-full sm:w-auto px-10 cursor-pointer">
                {status.loading ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                {!status.loading && <Send className="w-4 h-4 ml-2" />}
              </Button>

              {status.success && (
                <p className="text-green-500 font-medium text-sm">¡Mensaje enviado con éxito! Nos comunicaremos a la brevedad.</p>
              )}
              {status.error && (
                <p className="text-red-500 font-medium text-sm">Aviso: {status.error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
