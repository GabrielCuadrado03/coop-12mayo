import { UnidadTaxi } from '../types/dispatch.types';

export const INITIAL_TAXI_FLEET: UnidadTaxi[] = [
  {
    id: 'u-01',
    numero: '01',
    choferNombre: 'Carlos Morales',
    choferTelefono: '593984123456',
    placa: 'PBC-4512',
    estado: 'LIBRE',
    zonaActual: 'Parque Central',
    actualizadoEn: new Date().toISOString()
  },
  {
    id: 'u-03',
    numero: '03',
    choferNombre: 'Juan Guamán',
    choferTelefono: '593991234567',
    placa: 'PBC-7823',
    estado: 'LIBRE',
    zonaActual: 'Terminal Terrestre',
    actualizadoEn: new Date().toISOString()
  },
  {
    id: 'u-07',
    numero: '07',
    choferNombre: 'Luis Viteri',
    choferTelefono: '593976543210',
    placa: 'PBC-3321',
    estado: 'EN_CARRERA',
    zonaActual: 'Av. 12 de Octubre',
    actualizadoEn: new Date(Date.now() - 8 * 60000).toISOString()
  },
  {
    id: 'u-12',
    numero: '12',
    choferNombre: 'Patricio Chimbo',
    choferTelefono: '593988776655',
    placa: 'PBC-9012',
    estado: 'LIBRE',
    zonaActual: 'Hospital Básico',
    actualizadoEn: new Date().toISOString()
  },
  {
    id: 'u-15',
    numero: '15',
    choferNombre: 'Segundo Cuji',
    choferTelefono: '593994455667',
    placa: 'PBC-6789',
    estado: 'LIBRE',
    zonaActual: 'Mercado Central',
    actualizadoEn: new Date().toISOString()
  },
  {
    id: 'u-18',
    numero: '18',
    choferNombre: 'Marco Andrango',
    choferTelefono: '593971122334',
    placa: 'PBC-2468',
    estado: 'EN_CARRERA',
    zonaActual: 'Barrio Santa Anita',
    actualizadoEn: new Date(Date.now() - 14 * 60000).toISOString()
  },
  {
    id: 'u-22',
    numero: '22',
    choferNombre: 'Edgar Tipán',
    choferTelefono: '593998811223',
    placa: 'PBC-1357',
    estado: 'FUERA_SERVICIO',
    zonaActual: 'Taller Mecánico',
    actualizadoEn: new Date(Date.now() - 60 * 60000).toISOString()
  },
  {
    id: 'u-25',
    numero: '25',
    choferNombre: 'Fausto Pilataxi',
    choferTelefono: '593993344556',
    placa: 'PBC-8080',
    estado: 'LIBRE',
    zonaActual: 'Redondel Norte',
    actualizadoEn: new Date().toISOString()
  },
  {
    id: 'u-30',
    numero: '30',
    choferNombre: 'Geovanny Chasi',
    choferTelefono: '593982233445',
    placa: 'PBC-5544',
    estado: 'LIBRE',
    zonaActual: 'Estadio Municipal',
    actualizadoEn: new Date().toISOString()
  }
];
