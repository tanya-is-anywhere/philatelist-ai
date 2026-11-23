import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';
import { LoginForm } from '../../../features/auth/ui/LoginForm';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Вход</h2>
        <p className={styles.subtitle}>Рады видеть вас снова!</p>

        <LoginForm />

        <div className={styles.links}>
          <span onClick={() => navigate('/register')}>
            Нет аккаунта? Зарегистрироваться
          </span>
        </div>
      </div>
    </div>
  );
};