import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../../shared/ui';
import styles from './AuthPage.module.css';

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>

      <div className={styles.card}>
        <h2 className={styles.title}>Регистрация</h2>
        <p className={styles.subtitle}>Создайте аккаунт исследователя</p>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="EMAIL"
            className={styles.inputPassword} // Используем цвет #CC9F92
          />
          <Input
            placeholder="ПАРОЛЬ"
            isPassword
            className={styles.inputPassword}
          />
          <Input
            placeholder="ПОВТОРИТЕ ПАРОЛЬ"
            isPassword
            className={styles.inputLogin} // Используем цвет #B88366
          />

          <label className={styles.checkboxLabel}>
            <input type="checkbox" required />
            Я согласен с условиями использования
          </label>

          <Button type="submit" className={styles.submitButton}>
            Создать аккаунт
          </Button>
        </form>

        <div className={styles.links}>
          <span onClick={() => navigate('/login')}>
            Уже есть аккаунт? Войти
          </span>
        </div>
      </div>
    </div>
  );
};