import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../shared/api/axiosInstance';
import { useAuthStore } from '../../../entities/user/model/store';
import { Button } from '../../../shared/ui';
import styles from './LandingPage.module.css';

export const LandingPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  // Залогиненный пользователь сразу попадает на /upload,
  // гостю предлагаем регистрацию
  const startRoute = user && accessToken ? '/upload' : '/register';

  // Авто-редирект: если пользователь уже вошёл, лендинг ему не нужен
  useEffect(() => {
    if (user && accessToken) {
      navigate('/upload', { replace: true });
    }
  }, [user, accessToken, navigate]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await axiosInstance.get('/health');
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
            onClick={() => navigate(startRoute)}
          >
            Начать
          </Button>
        </div>
      </div>
    </div>
  );
};