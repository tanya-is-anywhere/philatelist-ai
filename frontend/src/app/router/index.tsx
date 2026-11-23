import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '../../pages/landing/ui/LandingPage';
import { LoginPage } from '../../pages/auth/ui/LoginPage';
import { RegisterPage } from '../../pages/auth/ui/RegisterPage';
import { ResultsPage } from '../../pages/results/ui/ResultsPage';
import { UploadPage } from '../../pages/upload/ui/UploadPage';
import { ProfilePage } from '../../pages/profile/ui/ProfilePage';
import { SettingsPage } from '../../pages/settings/ui/SettingsPage';
import { InstructionPage } from '../../pages/instructions/ui/InstructionPage';
import { CollectionPage } from '../../pages/collection/ui/CollectionPage';

import { MainLayout } from '../../widgets/main-layout/ui/MainLayout';

// Временные заглушки для страниц
import { Button, Input } from '../../shared/ui';

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
      { path: 'profile', element: <ProfilePage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'instructions', element: <InstructionPage /> },
    ],
  },
]);