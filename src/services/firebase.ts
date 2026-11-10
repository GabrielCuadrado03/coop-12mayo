// ========================================================
// Configuración e Inicialización de Firebase SDK v11+
// Cooperativa de Transportes 12 de Mayo - Puyo, Pastaza
// ========================================================

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'cooperativa-12-de-mayo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'cooperativa-12-de-mayo',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'cooperativa-12-de-mayo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID
);

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
export { app };

// Nombre canónico de colecciones de Firestore para el Despacho
export const COLLECTIONS = {
  CARRERAS: 'carreras',
  UNIDADES: 'unidades',
  OPERADORES: 'operadores',
  CONFIGURACION: 'configuracion',
} as const;
