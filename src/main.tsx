import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'katex/dist/katex.min.css';
import './index.css';
import App from './App.tsx';
import PaymentReturn from './PaymentReturn.tsx';
import PrivacyPolicy from './PrivacyPolicy.tsx';

const page = window.location.pathname;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {page === '/pago' ? <PaymentReturn /> : page === '/privacidad' ? <PrivacyPolicy /> : <App />}
  </StrictMode>,
);
