import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { DispatchPage } from '@/pages/DispatchPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page Institucional (Cooperativa 12 de Mayo - Puyo, Pastaza) */}
        <Route path="/" element={<LandingPage />} />

        {/* Panel de Despacho y Asignación Operativa en Tiempo Real */}
        <Route path="/despacho" element={<DispatchPage />} />

        {/* Política de Privacidad Oficial para Verificación de Meta Business */}
        <Route path="/politica-de-privacidad" element={<PrivacyPolicyPage />} />

        {/* Fallback a inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
