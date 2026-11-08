import { 
  Car, 
  Truck, 
  Radio, 
  Smartphone 
} from 'lucide-react';
import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';

// Fotos Oficiales de la Directiva y Cooperativa (Importadas vía alias enterprise @/assets)
import logoCoop from '@/assets/logo-cooperativa.png';
import imgDanilo from '@/assets/DaniloAguaguina.jpeg';
import imgRobert from '@/assets/RobertMaldonado.jpeg';
import imgAlison from '@/assets/AlisonMiranda.jpeg';
import imgSandra from '@/assets/SandraAcuario.jpeg';
import imgIvan from '@/assets/IvanRodriguez.jpeg';
import imgVeronica from '@/assets/VeronicaGuaman.jpeg';
import imgCarlos from '@/assets/CarlosVillacis.jpeg';
import imgByron from '@/assets/ByronSilva.jpeg';
import imgNelson from '@/assets/NelsonRojas.jpeg';
import imgJaime from '@/assets/image16.jpeg';

// Fotos Reales para Noticias y Eventos de la Cooperativa
import imgFestivalDifuntos from '@/assets/image19.jpeg';
import imgArriendoLocal from '@/assets/image20.jpeg';
import imgSesionSolemne from '@/assets/image21.jpeg';
import imgBlog1 from '@/assets/image4.jpeg';
import imgBlog2 from '@/assets/image16.jpeg';
import imgDoceApp from '@/assets/La12App.png';
import iconLaDoce from '@/assets/iconlaDoce.jpeg';

export const navigation = [
  { name: 'Inicio', href: '#home' },
  { name: 'Nosotros', href: '#about' },
  { name: 'Servicios', href: '#skills' },
  { name: 'Central 24/7', href: '#operaciones' },
  { name: 'Directiva', href: '#projects' },
  { name: 'Galería', href: '#galeria' },
  { name: 'Novedades', href: '#blog' },
  { name: 'Contacto', href: '#contact' },
];

export const social = [
  { name: 'Facebook', icon: SiFacebook, href: 'https://www.facebook.com/share/1Aga9nq5N2/?mibextid=wwXIfr' },
  { name: 'Instagram', icon: SiInstagram, href: 'https://www.instagram.com' },
  { name: 'WhatsApp', icon: SiWhatsapp, href: 'https://wa.me/593991108690?text=Hola%2C%20solicito%20un%20taxi%20de%20la%20Cooperativa%2012%20de%20Mayo' },
];

// 4 Pilares Institucionales para la sección About
export const roles = [
  {
    id: '01',
    title: 'Nuestra Misión',
    description: 'Prestar el servicio de taxi convencional con eficiencia y responsabilidad, mediante choferes profesionales en vehículos sedán y camionetas doble cabina. Brindamos un servicio seguro y oportuno a tarifa justa, promoviendo el desarrollo socioeconómico bajo principios de la Economía Popular y Solidaria.',
  },
  {
    id: '02',
    title: 'Nuestra Visión',
    description: 'Ser la cooperativa de transporte mixto líder y referente en Puyo y la provincia de Pastaza, reconocida por la eficiencia, responsabilidad y profesionalismo de nuestros choferes, unidades modernas en óptimas condiciones y el bienestar integral de nuestros socios y sus familias.',
  },
  {
    id: '03',
    title: 'Más de 50 Años de Historia',
    description: 'Fundada el 10 de junio de 1977. Durante más de medio siglo hemos acompañado el crecimiento de Pastaza, brindando seguridad, puntualidad y confianza a miles de ciudadanos y turistas amazónicos.',
  },
  {
    id: '04',
    title: 'Respaldo Institucional y SEPS',
    description: 'Entidad regulada por la Superintendencia de Economía Popular y Solidaria (SEPS) y miembro activo de la Unión de Cooperativas de Transporte de Taxis y Camionetas de Pastaza, garantizando estricto apego a la ley y normativas de tránsito.',
  },
];

// Métricas oficiales
export const stats = [
  { label: 'Años de Trayectoria', value: '50+' },
  { label: 'Unidades Mixtas Activas', value: '87' },
  { label: 'Servicio y Cobertura', value: '24/7' },
];

// Servicios principales (Skills en el diseño original)
export const skills = [
  { 
    name: 'Taxis Tipo Sedán', 
    icon: Car, 
    description: 'Servicio ágil, cómodo y seguro para traslados urbanos e intercantonales puerta a puerta en Puyo.' 
  },
  { 
    name: 'Camionetas Doble Cabina', 
    icon: Truck, 
    description: 'Modalidad de transporte mixto y carga liviana para rutas rurales, turísticas y la Amazonía.' 
  },
  { 
    name: 'Radiotaxi Central 24/7', 
    icon: Radio, 
    description: 'Despacho radial inmediato llamando al 03 289 6860 o vía WhatsApp con atención continua.' 
  },
  { 
    name: 'App "La Doce - Viaja Seguro"', 
    icon: Smartphone, 
    imageIcon: iconLaDoce,
    description: 'Nuestra nueva aplicación móvil para pedir taxi desde cualquier lugar con monitoreo en tiempo real.' 
  },
];

// Directiva Oficial 2026 - 2027
export const projects = [
{
    title: 'Ing. Sandra Acurio',
    description: 'Gerente General · Representante Legal',
    highlights: [
      'Representación legal, judicial y extrajudicial de la Cooperativa "12 de Mayo".',
      'Administración financiera, presupuesto anual y gestión operativa de la institución.',
      'Impulso a la innovación tecnológica, implementación de la App La Doce y cumplimiento con la SEPS.'
    ],
    image: imgSandra,
    moreImages: [],
    tags: ['Gerencia General', 'Representación Legal'],
    link: '#',
  },
  {
    title: 'Sr. Danilo Aguaguiña',
    description: 'Presidente · Consejo de Administración',
    highlights: [
      'Liderazgo institucional y representación gremial de la cooperativa en Puyo y Pastaza.',
      'Supervisión de planes estratégicos, bienestar societario y convenios institucionales.',
      'Compromiso permanente con la modernización de la flota y servicio a la comunidad.'
    ],
    image: imgDanilo,
    moreImages: [],
    tags: ['Consejo de Administración', 'Presidencia'],
    link: '#',
  },
  {
    title: 'Sr. Robert Maldonado',
    description: 'Vicepresidente · Consejo de Administración',
    highlights: [
      'Apoyo directo a la gestión de presidencia y subrogación estatutaria.',
      'Coordinación de comisiones de trabajo y fiscalización de acuerdos institucionales.',
      'Fortalecimiento de la unión gremial en Pastaza.'
    ],
    image: imgRobert,
    moreImages: [],
    tags: ['Consejo de Administración', 'Vicepresidencia'],
    link: '#',
  },
  {
    title: 'Tec. Alisson Miranda',
    description: 'Secretaria · Consejo de Administración',
    highlights: [
      'Custodia documental, gestión de actas, correspondencia y certificaciones societarias.',
      'Atención y enlace administrativo permanente entre socios, directiva y usuarios.',
      'Gestión digital y modernización de archivos institucionales.'
    ],
    image: imgAlison,
    moreImages: [],
    tags: ['Consejo de Administración', 'Secretaría'],
    link: '#',
  },
  {
    title: 'Sr. Iván Rodríguez',
    description: 'Vocal 3 · Consejo de Administración',
    highlights: [
      'Vocalía directiva en toma de resoluciones estatutarias y normativas de operación.',
      'Supervisión del cumplimiento de acuerdos societarios.',
      'Apoyo operativo y logístico a las 87 unidades.'
    ],
    image: imgIvan,
    moreImages: [],
    tags: ['Consejo de Administración', 'Vocalía'],
    link: '#',
  },
  {
    title: 'Sra. Verónica Guamán',
    description: 'Vocal 4 · Consejo de Administración',
    highlights: [
      'Participación activa en el Consejo de Administración y bienestar social familiar.',
      'Aporte al desarrollo de proyectos de equidad y fortalecimiento cooperativo.',
      'Canalización de propuestas de socios y operadoras.'
    ],
    image: imgVeronica,
    moreImages: [],
    tags: ['Consejo de Administración', 'Vocalía'],
    link: '#',
  },
  {
    title: 'Sr. Carlos Villacís',
    description: 'Vocal 5 · Consejo de Administración',
    highlights: [
      'Aporte técnico y operativo en el Consejo de Administración.',
      'Coordinación en mesas de trabajo con la Unión de Cooperativas de Pastaza.',
      'Control de calidad en la atención al usuario.'
    ],
    image: imgCarlos,
    moreImages: [],
    tags: ['Consejo de Administración', 'Vocalía'],
    link: '#',
  },
  {
    title: 'Sr. Jaime Álvarez',
    description: 'Presidente · Consejo de Vigilancia',
    highlights: [
      'Presidencia del órgano de control, fiscalización y vigilancia de la cooperativa.',
      'Vigilancia del correcto uso de los bienes y cuentas de la entidad.',
      'Garantía de transparencia hacia la asamblea general de socios.'
    ],
    //image: imgJaime,
    moreImages: [],
    tags: ['Consejo de Vigilancia', 'Presidencia'],
    link: '#',
  },
  {
    title: 'Sr. Nelson Rojas',
    description: 'Secretario · Consejo de Vigilancia',
    highlights: [
      'Órgano de fiscalización y control interno de la Cooperativa 12 de Mayo.',
      'Elaboración de actas, informes de auditoría interna y verificación de legalidad estatutaria.',
      'Transparencia y resguardo de los recursos de la institución.'
    ],
    image: imgNelson,
    moreImages: [],
    tags: ['Consejo de Vigilancia', 'Secretaría'],
    link: '#',
  },
  {
    title: 'Sr. Byron Silva',
    description: 'Directivo Institucional',
    highlights: [
      'Miembro directivo de la Cooperativa de Transporte de Taxis y Camionetas "12 de Mayo".',
      'Funciones y designación operativa a ser definidas formalmente.'
    ],
    image: imgByron,
    moreImages: [],
    tags: ['Directiva Institucional'],
    link: '#',
  },
];

// Las 5 Comisiones que funcionan en la Cooperativa 12 de Mayo (Modal Soluciones Reales)
export const solucionesReales = [
  {
    category: '1. Comisión de Educación y Capacitación',
    items: [
      'Encargada de cursos, becas y capacitación técnica permanente para socios y choferes profesionales.',
      'Talleres de educación vial, servicio al cliente y primeros auxilios.',
      'Actualización continua en leyes de tránsito y normativas de la SEPS.'
    ]
  },
  {
    category: '2. Comisión de Asuntos Sociales, Culturales y Deportes',
    items: [
      'Organización de eventos sociales, culturales y de integración familiar.',
      'Participación y liderazgo en el Campeonato de la Unión de Taxistas de Pastaza.',
      'Fomento de la unidad, la solidaridad y el compañerismo institucional.'
    ]
  },
  {
    category: '3. Comisión de Radio y Comunicación',
    items: [
      'Vigilancia estricta del buen uso de la frecuencia de radio y comunicación interna.',
      'Cumplimiento riguroso del Reglamento Interno de Despacho.',
      'Garantía de una comunicación fluida, respetuosa y oportuna hacia los usuarios.'
    ]
  },
  {
    category: '4. Comisión de Accidentes',
    items: [
      'Apoyo solidario inmediato en la gestión de bienes, vehículos y necesidades económicas de emergencia.',
      'Acompañamiento técnico y legal a socios y colaboradores ante siniestros viales.',
      'Fondo de auxilio y resguardo mutuo en beneficio de las familias de los socios.'
    ]
  },
  {
    category: '5. Comisión de Colaboradores',
    items: [
      'Regulación ética y técnica para el ingreso de nuevos colaboradores a la institución.',
      'Verificación de antecedentes, licencia profesional y récord de conducción.',
      'Inducción sobre los principios de calidad, respeto y honradez de la 12 de Mayo.'
    ]
  }
];

// Proyectos / Áreas del Modal Secundario
export const modalProjects = {
  transporte: [
    {
      title: 'APP MÓVIL "LA DOCE - VIAJA SEGURO"',
      entity: 'Plataforma Digital de Despacho y Monitoreo Satelital, 2026',
    },
    {
      title: 'RENOVACIÓN Y HOMOLOGACIÓN DE FLOTA',
      entity: '87 Unidades tipo Sedán y Camionetas Doble Cabina, Pastaza',
    },
    {
      title: 'CENTRAL DE RADIOFRECUENCIA 24 HORAS',
      entity: 'Operatividad y monitoreo continuo en Puyo',
    },
  ],
  institucional: [
    {
      title: 'CAMPEONATO DE LA UNIÓN DE TAXISTAS DE PASTAZA',
      entity: 'Comisión de Deportes y Asuntos Sociales',
    },
    {
      title: 'PLAN ANUAL DE CAPACITACIÓN Y EDUCACIÓN VIAL',
      entity: 'Comisión de Educación y SEPS',
    },
    {
      title: 'FONDO SOLIDARIO DE ASISTENCIA Y ACCIDENTES',
      entity: 'Comisión de Accidentes 12 de Mayo',
    },
  ],
};

// Noticias / Novedades de la Cooperativa (Blog)
export const blogPosts = [
  {
    id: 1,
    image: imgFestivalDifuntos,
    category: 'Eventos Festivos',
    title: 'Festival del Día de los Difuntos',
    date: '31 de Octubre 2026',
    link: '#'
  },
  {
    id: 2,
    image: imgArriendoLocal,
    category: 'Avisos Importantes',
    title: 'Se Arrienda Local Comercial',
    date: '24 de Octubre 2026',
    link: '#'
  },
  {
    id: 3,
    image: imgSesionSolemne,
    category: 'Eventos Festivos',
    title: 'Sesión Solemne 28 Años de Vida Institucional',
    date: '31 de Octubre 2026',
    link: '#'
  },
  {
    id: 4,
    image: imgDoceApp,
    category: 'Tecnología e Innovación',
    title: 'Lanzamiento Oficial de la App "La Doce - Viaja Seguro" en Puyo',
    date: 'Febrero 2026',
    link: '#'
  },
  {
    id: 5,
    image: imgBlog2,
    category: 'Historia y Aniversario',
    title: 'Celebrando más de 50 Años de Trayectoria y Seguridad en Pastaza (1977 - 2026)',
    date: 'Junio 2026',
    link: '#'
  },
  {
    id: 6,
    image: imgBlog1,
    category: 'Deportes y Comunidad',
    title: 'Participación en el Campeonato de la Unión de Cooperativas de Pastaza',
    date: 'Enero 2026',
    link: '#'
  }
];

// Datos de Contacto Oficiales
export const contactInfo = {
  address: 'Cooperativa de Transporte de Taxis y Camionetas "12 de Mayo"',
  location: 'Entrada al Parque Acuático, Calles Eugenio Espejo y Cacique Nayapi, Puyo, Pastaza, Ecuador',
  phone: '099 110 8690',
  phoneSecundario: '098 495 1682',
  landline: '(03) 289-6860',
  email: 'PorColocar',
  description: 'Despacho de Taxis y Camionetas 24 horas al día, los 365 días del año. Servicio seguro puerta a puerta.',
  logo: logoCoop
};
