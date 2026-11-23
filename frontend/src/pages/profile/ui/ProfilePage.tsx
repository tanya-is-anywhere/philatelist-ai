import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../entities/user/model/store';
import { Button } from '../../../shared/ui';
import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth(); // Очищаем токен и данные в Zustand
    navigate('/login'); // Перекидываем на вход
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.avatar}>
          {/* Заглушка аватара: первая буква email */}
          {user?.email ? user.email[0].toUpperCase() : 'U'}
        </div>

        <h1 className={styles.title}>Мой профиль</h1>
        <p className={styles.email}>{user?.email || 'Email не найден'}</p>

        <div className={styles.infoBlock}>
          <p><strong>Статус:</strong> Исследователь</p>
          <p><strong>Тариф:</strong> Базовый (MVP)</p>
        </div>

        <Button variant="secondary" onClick={handleLogout} className={styles.logoutBtn}>
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
};