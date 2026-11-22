import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../../shared/ui';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../../../entities/user/model/store';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Временно используем мок, если бэкенда нет (иначе - комментируем)
      const data = { access_token: 'fake-token', user: { id: '1', email } };

      //const data = await authApi.login(email, password); // это настоящие данные

      setAuth(data.user, data.access_token); // Сохраняем в Zustand
      navigate('/upload'); // Перекидываем на загрузку
    } catch (err: any) {
      setError('Неверный логин или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Input
        placeholder="ЛОГИН"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        placeholder="ПАРОЛЬ"
        isPassword
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <span style={{ color: 'red', fontSize: '14px' }}>{error}</span>}

      <Button type="submit" isLoading={isLoading}>
        Войти
      </Button>
    </form>
  );
};