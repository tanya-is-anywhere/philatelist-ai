import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../entities/user/model/store';
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.background}></div>

      {/* Логотип по центру */}
      <div className={styles.logoWrapper} onClick={() => navigate('/')}>
        <div className={styles.logoBackground}></div>
        <span className={styles.logo}>Филателист AI</span>
      </div>

      {/* Блок навигации справа */}
      <div className={styles.navBlock}>
        {user && (
          <div className={styles.navPill}>
            <button
              onClick={() => navigate('/settings')}
              className={styles.iconBtn}
              title="Настройки"
            >
              ⚙️
            </button>

            <span className={styles.userEmail} onClick={() => navigate('/profile')}>
              {user.email}
            </span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Выйти
            </button>
          </div>
        )}
      </div>
    </header>
  );
};