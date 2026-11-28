import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from './providers/RouterProvider';
import { QueryProvider } from './providers/QueryProvider';
import { initTheme } from '../entities/user/model/themeStore';
import './styles/index.css';

initTheme();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Оборачиваем роутер в провайдер запросов */}
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  </React.StrictMode>
);