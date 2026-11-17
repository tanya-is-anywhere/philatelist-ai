import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../../shared/ui';
import styles from './AuthPage.module.css';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>

      <div className={styles.card}>
        <h2 className={styles.title}>Вход</h2>
        <p className={styles.subtitle}>Рады видеть вас снова!</p>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="ЛОГИН"
            className={styles.inputLogin}
          />
          <Input
            placeholder="ПАРОЛЬ"
            isPassword
            className={styles.inputPassword}
          />

          <Button type="submit" className={styles.submitButton}>
            Войти
          </Button>
        </form>

        <div className={styles.links}>
          <span onClick={() => navigate('/register')}>
            Нет аккаунта? Зарегистрироваться
          </span>
        </div>
      </div>
    </div>
  );
};