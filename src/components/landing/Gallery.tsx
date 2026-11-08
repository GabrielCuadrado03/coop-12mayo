import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, HeartHandshake, X, ZoomIn } from 'lucide-react';

import img1 from '@/assets/image1.jpeg';
import img2 from '@/assets/image2.jpeg';
import img3 from '@/assets/image3.jpeg';
import img7 from '@/assets/image7.jpeg';
import img8 from '@/assets/image8.jpeg';
import img9 from '@/assets/image9.jpeg';
import img11 from '@/assets/image11.jpeg';
import img12 from '@/assets/image12.jpeg';
import img13 from '@/assets/image13.jpeg';
import img15 from '@/assets/image15.jpeg';

interface GalleryItem {
  id: number;
  image: string;
  category: 'deportes' | 'familia' | 'institucional';
  categoryLabel: string;
  title: string;
  description: string;
  highlight?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: img9,
    category: 'deportes',
    categoryLabel: 'Deportes y Triunfos',
    title: 'Campeones de Pastaza',
    description: 'Premiación al equipo ganador de la Cooperativa 12 de Mayo con la entrega oficial del trofeo por parte de la Gerencia.',
    highlight: 'Trofeo de Campeones'
  },
  {
    id: 2,
    image: img12,
    category: 'deportes',
    categoryLabel: 'Deportes y Triunfos',
    title: '1er Campeonato de Ecuavoley',
    description: 'Nuestros socios deportistas obtuvieron el Segundo Lugar en el torneo entre operadoras de transporte de Pastaza.',
    highlight: 'Vicecampeonato Provincial'
  },
  {
    id: 3,
    image: img7,
    category: 'deportes',
    categoryLabel: 'Deportes y Triunfos',
    title: 'Inauguración y Srta. Deportes',
    description: 'Delegación deportiva oficial de la 12 de Mayo desfilando con sus colores amarillo y verde junto a la madrina institucional.',
    highlight: 'Desfile Oficial'
  },
  {
    id: 4,
    image: img8,
    category: 'deportes',
    categoryLabel: 'Deportes y Triunfos',
    title: 'Compañerismo en Cancha',
    description: 'El deporte une a nuestros socios y choferes profesionales en jornadas de integración nocturnas en Puyo.',
    highlight: 'Integración Nocturna'
  },
  {
    id: 5,
    image: img13,
    category: 'familia',
    categoryLabel: 'Familia y Comunidad',
    title: 'La Gran Familia 12 de Mayo',
    description: 'Celebración en las gradas del coliseo con esposas, hijos, nietos y compañeros compartiendo el triunfo institucional.',
    highlight: 'Unión Familiar'
  },
  {
    id: 6,
    image: img11,
    category: 'familia',
    categoryLabel: 'Familia y Comunidad',
    title: 'Apoyo en los Graderíos',
    description: 'Nuestra barra y socios viviendo la fiesta del deporte con alegría y el pulgar arriba por el futuro de la cooperativa.',
    highlight: 'Hinchada y Socios'
  },
  {
    id: 7,
    image: img1,
    category: 'familia',
    categoryLabel: 'Familia y Comunidad',
    title: 'Compromiso con Pastaza',
    description: 'Encuentro gremial y confraternidad de los socios de la 12 de Mayo con autoridades amazónicas y líderes locales.',
    highlight: 'Liderazgo Amazónico'
  },
  {
    id: 8,
    image: img15,
    category: 'institucional',
    categoryLabel: 'Actos Solemnes',
    title: 'Misa y Bendición de la Flota',
    description: 'Ceremonia religiosa solemne en el coliseo pidiendo por la salud, bienestar y protección divina de nuestros conductores en las vías.',
    highlight: 'Bendición Espiritual'
  },
  {
    id: 9,
    image: img3,
    category: 'institucional',
    categoryLabel: 'Actos Solemnes',
    title: 'Mesa Directiva Institucional',
    description: 'Sesión de trabajo y acuerdos de los dirigentes elegidos democráticamente para regir el destino de la cooperativa.',
    highlight: 'Gobernanza Democrática'
  },
  {
    id: 10,
    image: img2,
    category: 'institucional',
    categoryLabel: 'Actos Solemnes',
    title: 'Choferes Profesionales Certificados',
    description: 'Nuestros conductores en sus unidades sedán homologadas, promoviendo el servicio puerta a puerta con credencial visible.',
    highlight: 'Servicio Puerta a Puerta'
  }
];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'todos' | 'deportes' | 'familia' | 'institucional'>('todos');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter(item => {
    if (activeCategory === 'todos') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="galeria" className="py-24 bg-white dark:bg-dark-bg transition-colors relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#02913F] dark:text-[#FCD00B] block mb-2">
              Nuestra Gente y Tradición
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0A2615] dark:text-white tracking-tight leading-tight">
              Vida Cooperativa, Deportes y Familia
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base max-w-2xl">
              Más de medio siglo construyendo unión, triunfos en las canchas de Pastaza y momentos inolvidables junto a los socios y sus familias.
            </p>
          </div>

          {/* Pestañas de Filtro Interactivas */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 shrink-0">
            <button
              onClick={() => setActiveCategory('todos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'todos'
                  ? 'bg-[#0A2615] text-white dark:bg-[#FCD00B] dark:text-[#0A0D0B] shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }`}
            >
              Todos ({galleryItems.length})
            </button>
            <button
              onClick={() => setActiveCategory('deportes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeCategory === 'deportes'
                  ? 'bg-[#0A2615] text-white dark:bg-[#FCD00B] dark:text-[#0A0D0B] shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Deportes y Triunfos</span>
            </button>
            <button
              onClick={() => setActiveCategory('familia')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeCategory === 'familia'
                  ? 'bg-[#0A2615] text-white dark:bg-[#FCD00B] dark:text-[#0A0D0B] shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Familia y Comunidad</span>
            </button>
            <button
              onClick={() => setActiveCategory('institucional')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeCategory === 'institucional'
                  ? 'bg-[#0A2615] text-white dark:bg-[#FCD00B] dark:text-[#0A0D0B] shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Actos Solemnes</span>
            </button>
          </div>
        </div>

        {/* Cuadrícula de Fotografías */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                onClick={() => setSelectedPhoto(item)}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay oscuro al hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Badge de Categoría Superior */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#FCD00B] border border-white/10">
                    {item.highlight || item.categoryLabel}
                  </span>
                </div>

                {/* Icono de zoom */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Texto inferior de la tarjeta */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-black leading-snug drop-shadow-sm group-hover:text-[#FCD00B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal / Lightbox al hacer clic en una foto */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-[#071A11] rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] shadow-2xl border border-gray-200 dark:border-white/15 flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-black overflow-hidden">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    aria-label="Cerrar vista ampliada"
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#02913F]/15 dark:bg-[#FCD00B]/15 text-[#02913F] dark:text-[#FCD00B]">
                      {selectedPhoto.categoryLabel}
                    </span>
                    <span className="text-xs text-gray-500">• Cooperativa 12 de Mayo Puyo</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0A2615] dark:text-white">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Gallery;
