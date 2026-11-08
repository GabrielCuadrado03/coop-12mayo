import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Header, Footer } from '@/components/landing';
import { contactInfo } from '@/data/coopData';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-soft dark:bg-dark-bg text-gray-900 dark:text-gray-100">
      <Header />

      <main className="max-w-4xl mx-auto px-6 pt-36 pb-24">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-brand-primary dark:text-brand-secondary font-bold mb-8 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la página principal</span>
        </a>

        <div className="bg-white dark:bg-dark-card p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-200 dark:border-brand-secondary/20 space-y-8">
          <div className="border-b border-gray-200 dark:border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/15 text-brand-secondary text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Verificación Oficial Meta Business</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-gray-900 dark:text-white">
              Política de Privacidad y Tratamiento de Datos
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Última actualización: Noviembre 2026 | Cooperativa de Transporte en Taxis 12 de Mayo
            </p>
          </div>

          <section className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display">
              1. Identidad del Responsable del Tratamiento
            </h2>
            <p>
              La <strong>Cooperativa de Transporte en Taxis 12 de Mayo</strong>, con domicilio legal en 
              Calle Atahualpa y Av. Alberto Zambrano, Puyo, Provincia de Pastaza, Ecuador, es la responsable del tratamiento de los datos 
              personales recabados a través de su canal oficial de WhatsApp Business y su plataforma web de despacho.
            </p>
          </section>

          <section className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display">
              2. Datos Recopilados y Finalidad
            </h2>
            <p>
              Para prestar el servicio de despacho de taxis ejecutivos a través de la API oficial de WhatsApp Cloud de Meta, recopilamos 
              exclusivamente los siguientes datos provistos voluntariamente por el usuario:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Número de Teléfono:</strong> Para identificar al solicitante y enviar las confirmaciones de la carrera asignada.</li>
              <li><strong>Nombre de Perfil de WhatsApp:</strong> Para dirigirnos al usuario y registrar la solicitud en el panel de operadoras.</li>
              <li><strong>Ubicación GPS o Dirección en Texto:</strong> Compartida voluntariamente por el usuario para indicar al conductor el punto exacto de recogida.</li>
            </ul>
          </section>

          <section className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display">
              3. Uso Exclusivo del Servicio de Transporte
            </h2>
            <p>
              Los datos recopilados se utilizan únicamente para la coordinación operativa de la carrera solicitada entre el cliente y el taxista 
              asignado. La Cooperativa 12 de Mayo no vende, no comercializa ni comparte datos personales con terceras partes ajenas a la prestación 
              del servicio.
            </p>
          </section>

          <section className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display">
              4. Ejercicio de Derechos de Eliminación de Datos
            </h2>
            <p>
              Cualquier usuario tiene derecho a solicitar la eliminación de su historial de carreras y datos asociados. Para hacerlo, puede enviar un 
              correo electrónico formal a:
            </p>
            <div className="p-4 rounded-xl bg-brand-primary/5 dark:bg-white/5 border border-brand-primary/10 dark:border-white/10">
              <p className="font-bold text-brand-primary dark:text-brand-secondary">
                Correo Oficial: {contactInfo.email}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Asunto: "Solicitud de Eliminación de Datos Personales - WhatsApp Taxi"
              </p>
            </div>
          </section>

          <section className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display">
              5. Contacto Legal y Domicilio
            </h2>
            <p>
              <strong>Dirección:</strong> {contactInfo.address}, {contactInfo.location}<br />
              <strong>Teléfono:</strong> {contactInfo.phone}<br />
              <strong>Correo:</strong> {contactInfo.email}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
