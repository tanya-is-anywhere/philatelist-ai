import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '../../pages/landing/ui/LandingPage'; // Импортируем реальную страницу
import { LoginPage } from '../../pages/auth/ui/LoginPage';
import { RegisterPage } from '../../pages/auth/ui/RegisterPage';
import { MainLayout } from '../../widgets/main-layout/ui/MainLayout';

// Временные заглушки для страниц
import { Button, Input } from '../../shared/ui';

const UploadPage = () => <div style={{ padding: '20px' }}><h1>Страница загрузки (Upload)</h1></div>;
const ResultsPage = () => <div style={{ padding: '20px' }}><h1>Страница результатов (Results)</h1></div>;
const CollectionPage = () => <div style={{ padding: '20px' }}><h1>Моя коллекция (Collection)</h1></div>;

export const router = createBrowserRouter([
  {
    // Лендинг БЕЗ шапки (отдельный маршрут)
    path: '/',
    element: <LandingPage />,
  },
  {
    // Все остальные страницы ВНУТРИ MainLayout (с шапкой)
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'upload', element: <UploadPage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: 'collection', element: <CollectionPage /> },
    ],
  },
]);