import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '../../pages/landing/ui/LandingPage'; // Импортируем реальную страницу

// Временные заглушки для страниц
import { Button, Input } from '../../shared/ui';

// const LandingPage = () => (
//   <div style={{ padding: '20px', maxWidth: '400px' }}>
//     <h1>Главная страница</h1>
//     <Input label="Email" placeholder="Введите вашу почту" />
//     <Input label="Пароль" isPassword placeholder="Минимум 8 символов" />
//     <Input label="С ошибкой" error="Неверный формат почты" />
//     <Button>Войти</Button>
//   </div>
// );
const LoginPage = () => <div style={{ padding: '20px' }}><h1>Страница входа (Login)</h1></div>;
const RegisterPage = () => <div style={{ padding: '20px' }}><h1>Страница регистрации (Register)</h1></div>;
const UploadPage = () => <div style={{ padding: '20px' }}><h1>Страница загрузки (Upload)</h1></div>;
const ResultsPage = () => <div style={{ padding: '20px' }}><h1>Страница результатов (Results)</h1></div>;
const CollectionPage = () => <div style={{ padding: '20px' }}><h1>Моя коллекция (Collection)</h1></div>;

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/upload', element: <UploadPage /> },
  { path: '/results', element: <ResultsPage /> },
  { path: '/collection', element: <CollectionPage /> },
]);