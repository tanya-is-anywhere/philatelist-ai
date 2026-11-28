import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
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
      const tokens = await authApi.login(email, password);

      // Бэкенд на /login возвращает только токены (TokenResponse),
      // без объекта user. Пока id не приходит — кладём email,
      // который у нас уже есть из формы.
      // TODO: попросить Викторию вернуть user в ответе /login
      const user = { id: 'temp-id', email: email };

      // Передаём наш объект user, а не несуществующий data.user
      setAuth(user, tokens.access_token);

      navigate('/upload');
    } catch (err: unknown) {
      // 401 — неверные данные, остальное — сетевые и прочие ошибки
      if (isAxiosError(err) && err.response?.status === 401) {
        setError('Неверный логин или пароль');
      } else {
        setError('Ошибка соединения. Проверьте, запущен ли сервер.');
      }
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
