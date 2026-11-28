import { Outlet } from 'react-router-dom';
import { Header } from '../../header/ui/Header';

export const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Outlet /> {/* Сюда будут подставляться наши страницы */}
      </main>
    </div>
  );
};