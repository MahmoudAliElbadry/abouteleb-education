import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.js';
import './styles.css';
import { initializeMonitoring } from './monitoring.js';
import { LanguageProvider } from './features/i18n/LanguageContext.js';

const queryClient = new QueryClient();
initializeMonitoring();

if (import.meta.env.DEV) {
  void import('./developer-tools.js').then(({ enableDeveloperTools }) => enableDeveloperTools());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  </StrictMode>,
);
