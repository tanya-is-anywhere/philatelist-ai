import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from './providers/RouterProvider';
import { QueryProvider } from './providers/QueryProvider';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Оборачиваем роутер в провайдер запросов */}
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  </React.StrictMode>
);