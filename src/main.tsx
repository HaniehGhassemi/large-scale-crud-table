import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/styles/global.scss';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './stores/store.ts';
import { worker } from './mocks/browser.ts';

async function enableMocking() {
  if (import.meta.env.VITE_APP_API) {
    await worker.start();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
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
      </Provider>
    </StrictMode>,
  );
});
