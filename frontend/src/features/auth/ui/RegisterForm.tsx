import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../../shared/ui';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../../../entities/user/model/store';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 8) {
      setError('Пароль должен содержать минимум 8 символов');
      return;
    }

    setIsLoading(true);

    try {
      // Делаем запрос на регистрацию
      const data = await authApi.register(email, password);

      // Сохраняем токен и данные пользователя (если бэкенд сразу возвращает токен)
      setAuth(data.user, data.access_token);

      // Перекидываем на инструкцию после регистрации
      navigate('/instructions');
    } catch (err: any) {
      // Обработка ошибки от бэкенда
      setError('Ошибка регистрации. Возможно, этот email уже занят.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Input
        type="email"
        placeholder="EMAIL"
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
      <Input
        placeholder="ПОВТОРИТЕ ПАРОЛЬ"
        isPassword
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      {error && <span style={{ color: '#E05A4E', fontSize: '14px', textAlign: 'center' }}>{error}</span>}

      <Button type="submit" isLoading={isLoading}>
        Создать аккаунт
      </Button>
    </form>
  );
};