/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta Oficial Abstraída del Emblema de la Cooperativa 12 de Mayo
        coop: {
          green: {
            light: '#EBF8F0',
            DEFAULT: '#02913F', // Verde oficial de los pinos y hemisferio inferior
            dark: '#01632B',
            deep: '#082C17',    // Verde bosque profundo
          },
          yellow: {
            light: '#FFF9C4',
            DEFAULT: '#FFCC00', // Amarillo taxi oficial del hemisferio superior
            dark: '#E5B800',    // Hover de botones
            glow: '#FFD633',
          },
          red: {
            DEFAULT: '#DA261D', // Rojo oficial del N° 5 (Acentos y llamadas de acción)
            dark: '#B91C1C',
          },
          silver: {
            light: '#E5E7EB',
            DEFAULT: '#989899', // Aro metálico del emblema
            dark: '#6B7280',
          },
          dark: '#0A0D0B',      // Negro antena / asfalto
          // Soporte compatibilidad con el panel de despacho
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#02913F',
          600: '#01632B',
          700: '#082C17',
          800: '#062012',
          900: '#04150b',
          accent: '#FFCC00'
        },

        // Mapeo para el sistema de diseño de la landing page
        'brand-primary': {
          DEFAULT: '#02913F',  // Verde Cooperativo Oficial
          dark: '#082C17',     // Fondo oscuro elegante
          deep: '#051E10',
          olive: '#0B4D27',
          soft: '#25A65B',
          light: '#EBF8F0',
        },
        'brand-secondary': {
          DEFAULT: '#FFCC00',  // Amarillo Taxi Oficial
          gold: '#E5B800',
          light: '#FFF9C4',
        },
        'brand-red': {
          DEFAULT: '#DA261D',  // Rojo N° 5 del emblema
          dark: '#B91C1C',
        },
        'brand-silver': {
          DEFAULT: '#989899',  // Gris plata metálico del aro
          light: '#E5E7EB',
          dark: '#6B7280',
        },
        primary: {
          DEFAULT: '#02913F',
        },
        secondary: {
          DEFAULT: '#FFCC00',
        },
        accent: {
          gold: '#FFCC00',
          red: '#DA261D',
        },
        neutral: {
          soft: '#F4F9F5',
          border: '#D1DDD5',
        },
        dark: {
          bg: '#071A11',       // Fondo nocturno verde bosque profundo
          card: '#0D2F1F',     // Tarjetas nocturnas
          text: '#F9FAFB',
        },
        light: {
          bg: '#F4F9F5',
          card: '#FFFFFF',
          text: '#071A11',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace']
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
