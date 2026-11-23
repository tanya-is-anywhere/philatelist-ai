import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // <-- Импорт TanStack Query
import { axiosInstance } from '../../../shared/api/axiosInstance'; // <-- Импорт Axios
import { Button } from '../../../shared/ui';
import styles from './LandingPage.module.css';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
  queryKey: ['health'],
  queryFn: async () => {
    const res = await axiosInstance.get('/health'); // Запрос на бэкенд
    return res.data;
  },
});
  console.log('Статус бэкенда:', { data, isLoading, isError });

  return (
    <div className={styles.container}>

      <div className={styles.background}></div>

      <div className={styles.content}>
        <h2 className={styles.welcomeText}>Добро пожаловать, исследователь!</h2>

        <h1 className={styles.logoText}>Филателист AI</h1>

        <p className={styles.subtitle}>готов приступить к поиску</p>

        <div className={styles.actions}>
          <Button
            className={styles.customButton}
            onClick={() => navigate('/register')}
          >
            Начать
          </Button>
        </div>
      </div>
    </div>
  );
};