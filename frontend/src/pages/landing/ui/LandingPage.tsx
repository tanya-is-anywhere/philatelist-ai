import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui';
import styles from './LandingPage.module.css';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>

      <div className={styles.background}></div>

      <div className={styles.content}>
        <h2 className={styles.welcomeText}>Добро пожаловать, исследователь!</h2>

        <h1 className={styles.logoText}>Филателист АИ</h1>

        <p className={styles.subtitle}>готов приступить к поиску</p>

        <div className={styles.actions}>
          <Button
            className={styles.customButton}
            onClick={() => navigate('/upload')}
          >
            Начать
          </Button>
        </div>
      </div>
    </div>
  );
};