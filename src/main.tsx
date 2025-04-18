import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/styles/global.scss';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        theme="light"
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </StrictMode>,
  );
});
