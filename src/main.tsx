import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

// PWA Service Worker Registration
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => {
        // SW registered
        if (import.meta.env.DEV) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }
      })
      .catch((err) => {
        if (import.meta.env.DEV) {
          console.warn('ServiceWorker registration failed: ', err);
        }
      });
  });
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
