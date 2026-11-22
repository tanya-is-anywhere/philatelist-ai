import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';
import { RegisterForm } from '../../../features/auth/ui/RegisterForm';

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>

      <div className={styles.card}>
        <h2 className={styles.title}>Регистрация</h2>
        <p className={styles.subtitle}>Создайте аккаунт исследователя</p>

        <RegisterForm />

        <div className={styles.links}>
          <span onClick={() => navigate('/login')}>
            Уже есть аккаунт? Войти
          </span>
        </div>
      </div>
    </div>
  );
};