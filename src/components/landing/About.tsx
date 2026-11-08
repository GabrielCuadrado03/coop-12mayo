import React from 'react';
import { motion } from 'framer-motion';
import { roles, stats } from '@/data/coopData';
import image2 from '@/assets/image17.jpeg';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-dark-bg transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          {/* Roles List - Misión, Visión, Historia, SEPS */}
          <div className="space-y-10">
            <div className="mb-4">
              <span className="text-brand-secondary text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
                Identidad y Principios
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white tracking-tight">
                Pilares Institucionales
              </h2>
            </div>

            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="flex gap-6 sm:gap-8 group"
              >
                <span className="text-4xl sm:text-5xl font-black text-gray-300 dark:text-white/10 transition-colors group-hover:text-brand-primary dark:group-hover:text-brand-secondary">
                  {role.id}
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image Component */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10 border border-brand-secondary/20"
            >
              <img
                src={image2}
                alt="Cooperativa 12 de Mayo Puyo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass text-white">
                <span className="text-xs uppercase tracking-widest text-brand-secondary font-bold block mb-1">
                  Sede Central · Puyo, Pastaza
                </span>
                <p className="text-sm font-medium text-white/90">
                  Entrada al Parque Acuático, Calles Eugenio Espejo y Cacique Nayapi
                </p>
              </div>
            </motion.div>

            {/* Glowing Shapes */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-secondary rounded-full blur-3xl opacity-20 -z-0" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-primary rounded-full blur-3xl opacity-20 -z-0" />
          </div>
        </div>

        {/* Resumen Institucional */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 dark:text-white tracking-tight">
            Compromiso con Nuestra Gente Amazónica
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
            Desde el 10 de junio de 1977, la Cooperativa de Taxis y Camionetas "12 de Mayo" ha servido con honor y vocación a Puyo y la provincia de Pastaza. Con 87 unidades mixtas en circulación y bajo los principios de la Economía Popular y Solidaria, promovemos la eficiencia, disciplina y honestidad como pilares para garantizar la seguridad de cada pasajero y el sustento digno de nuestras familias socias.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 sm:gap-12 border-t border-gray-100 dark:border-white/10 pt-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-light-bg/50 dark:bg-white/5 border border-gray-100 dark:border-white/5"
            >
              <div className="text-5xl md:text-6xl font-black text-brand-primary dark:text-brand-secondary mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-semibold text-sm sm:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
