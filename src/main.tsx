import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/styles/global.scss';
import App from './App.tsx';

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
