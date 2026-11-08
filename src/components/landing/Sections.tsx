import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, projects, social, solucionesReales, blogPosts } from '@/data/coopData';
import { ExternalLink, X, ArrowRight, Shield, CheckCircle2, QrCode } from 'lucide-react';
import { ProjectsModal } from './ProjectsModal';

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white dark:bg-dark-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-gray-100 dark:border-brand-secondary/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-dark-bg">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-top" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/30 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-brand-secondary text-coop-dark rounded-full text-xs font-black uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">{project.title}</h3>
            <p className="text-brand-secondary font-medium text-sm sm:text-base">{project.description}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-secondary mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Funciones y Responsabilidades Estatutarias
            </h4>
            <ul className="space-y-3">
              {project.highlights.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary dark:text-brand-secondary shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-white/10">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-full transition-colors text-sm shadow-md cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface SolutionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SolutionsModal: React.FC<SolutionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white dark:bg-dark-card w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 sm:p-8 relative border border-gray-100 dark:border-brand-secondary/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-brand-secondary text-xs font-bold uppercase tracking-widest block mb-1">
            Organización Interna
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold dark:text-white">
            Comisiones Institucionales
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Órganos operativos encargados del bienestar, regulación y desarrollo integral de la Cooperativa "12 de Mayo".
          </p>
        </div>

        <div className="space-y-6">
          {solucionesReales.map((solucion, index) => (
            <div key={index} className="p-4 sm:p-5 rounded-2xl bg-light-bg/60 dark:bg-white/5 border-l-4 border-brand-secondary">
              <h4 className="text-base sm:text-lg font-bold mb-3 text-brand-primary dark:text-white">
                {solucion.category}
              </h4>
              <ul className="space-y-2">
                {solucion.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 bg-brand-secondary rounded-full shrink-0"></span>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs sm:text-sm">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end pt-6 mt-6 border-t border-gray-100 dark:border-white/10">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-primary/90 transition-colors text-sm shadow-md cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Skills: React.FC = () => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  return (
    <section id="skills" className="py-24 bg-white dark:bg-dark-bg transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-brand-secondary text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
              Flota y Modalidades
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white tracking-tight">
              Servicios de Transporte Mixto
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base max-w-xl">
              87 unidades equipadas para brindarte rapidez, confort y seguridad en Puyo y toda la provincia de Pastaza.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {skills.map((skill, index) => {
            const hasImageIcon = Boolean((skill as any).imageIcon);

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  if (hasImageIcon) {
                    setIsAppModalOpen(true);
                  }
                }}
                className={`p-6 sm:p-8 rounded-3xl bg-light-bg dark:bg-dark-card border shadow-xl dark:shadow-black/30 flex flex-col items-center text-center group transition-all relative ${
                  hasImageIcon 
                    ? 'border-[#DA261D]/40 dark:border-[#FCD00B]/40 hover:border-[#DA261D] dark:hover:border-[#FCD00B] cursor-pointer' 
                    : 'border-gray-100 dark:border-brand-secondary/20'
                }`}
              >
                {/* Badge para la App */}
                {hasImageIcon && (
                  <span className="absolute -top-3 px-3 py-1 bg-[#DA261D] text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md">
                    Descargar App
                  </span>
                )}

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all shadow-sm overflow-hidden p-1.5 ${
                  hasImageIcon
                    ? 'bg-white ring-2 ring-[#DA261D] dark:ring-[#FCD00B]'
                    : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10'
                }`}>
                  {hasImageIcon ? (
                    <img
                      src={(skill as any).imageIcon}
                      alt={skill.name}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-brand-primary/10 dark:bg-brand-secondary/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white dark:group-hover:bg-brand-secondary dark:group-hover:text-coop-dark text-brand-primary dark:text-brand-secondary transition-all">
                      <skill.icon className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <h4 className="font-bold text-lg mb-2 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors">
                  {skill.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {skill.description}
                </p>

                {/* Botón interactivo para la App */}
                {hasImageIcon && (
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DA261D]/10 text-[#DA261D] dark:bg-[#FCD00B]/15 dark:text-[#FCD00B] text-xs font-bold uppercase tracking-wider group-hover:bg-[#DA261D] group-hover:text-white dark:group-hover:bg-[#FCD00B] dark:group-hover:text-black transition-all">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Ver QR y Descarga</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsSolutionsOpen(true)}
            className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-white hover:bg-brand-primary/90 font-bold rounded-full transition-all shadow-xl hover:shadow-brand-primary/30 hover:scale-105 text-sm uppercase tracking-wider cursor-pointer"
          >
            <span>Ver Comisiones Institucionales</span>
            <ArrowRight className="w-4 h-4 text-brand-secondary" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        <SolutionsModal 
          isOpen={isSolutionsOpen} 
          onClose={() => setIsSolutionsOpen(false)} 
        />
      </AnimatePresence>

      <ProjectsModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        initialTab="app"
      />
    </section>
  );
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="py-24 bg-light-bg dark:bg-dark-bg/60 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-brand-secondary text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
            Gobernanza y Liderazgo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white tracking-tight">
            Directiva Oficial 2026 - 2027
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base max-w-xl">
            Consejo de Administración, Gerencia y Consejo de Vigilancia comprometidos con la transparencia, el bienestar de los socios y la excelencia en el servicio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-dark-card shadow-xl dark:shadow-black/30 border border-transparent dark:border-brand-secondary/20 flex flex-col hover:border-brand-primary/40 dark:hover:border-brand-secondary/40 transition-all"
            >
              <div className="aspect-[4/4.5] overflow-hidden bg-gray-100 dark:bg-dark-bg relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mt-1 mb-4">
                  {project.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-center">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1.5 text-brand-primary dark:text-brand-secondary font-bold text-xs uppercase tracking-wider hover:underline cursor-pointer"
                  >
                    <span>Ver Funciones</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-semibold text-gray-400">2026 - 2027</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export const Blog: React.FC = () => (
  <section id="blog" className="py-24 bg-white dark:bg-dark-bg transition-colors">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <span className="text-brand-secondary text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
          Actualidad y Eventos
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white tracking-tight">
          Novedades y Comunidad
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
          Entérate de las últimas noticias, avances tecnológicos y actividades de la 12 de Mayo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col gap-4 rounded-3xl p-4 bg-light-bg/40 dark:bg-dark-card border border-transparent dark:border-brand-secondary/20 shadow-md hover:shadow-xl transition-all"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <span className="absolute top-3 left-3 px-3 py-1 bg-brand-secondary text-coop-dark rounded-full text-xs font-black uppercase tracking-wider shadow">
                {post.category}
              </span>
            </div>
            <div className="flex flex-col flex-grow px-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors cursor-pointer">
                {post.title}
              </h3>
              <p className="text-gray-500 text-xs mt-auto pt-2 border-t border-gray-100 dark:border-white/10">
                {post.date} · Cooperativa 12 de Mayo
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Footer: React.FC = () => (
  <footer className="pt-12 pb-8 bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-brand-secondary/20 transition-colors">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <img 
            src="/logo-cooperativa.png" 
            alt="Cooperativa 12 de Mayo" 
            className="w-10 h-10 rounded-full object-contain ring-2 ring-brand-secondary/80 bg-white" 
          />
          <div className="text-lg sm:text-xl font-bold dark:text-white">
            COOPERATIVA 12 DE MAYO<span className="text-brand-secondary">.</span>
          </div>
        </div>
        <div className="flex gap-4">
          {social.map(item => (
            <a 
              key={item.name} 
              href={item.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-9 h-9 rounded-full bg-light-bg dark:bg-dark-card border border-gray-200 dark:border-white/10 text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-secondary transition-all flex items-center justify-center text-sm shadow-sm hover:scale-105"
              title={item.name}
            >
              <item.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Al final de todo en un lugar no tan visible */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400 dark:text-gray-600 text-center sm:text-left">
        <p>© {new Date().getFullYear()} Cooperativa de Transporte de Taxis y Camionetas "12 de Mayo" · Puyo, Pastaza, Ecuador.</p>
        <a 
          href="/politica-de-privacidad" 
          className="hover:underline transition-colors text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
        >
          Política de Privacidad y Tratamiento de Datos
        </a>
      </div>
    </div>
  </footer>
);
