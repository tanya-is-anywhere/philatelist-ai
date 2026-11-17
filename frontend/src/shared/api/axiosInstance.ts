import axios from 'axios';

// Базовый URL нашего бэкенда (берем из .env файла)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Важно для отправки HttpOnly cookies (refresh-токенов)
});

// 🛡️ ИНТЕРСЕПТОР (Перехватчик)
// Он срабатывает ПЕРЕД тем, как запрос уйдет на сервер.
axiosInstance.interceptors.request.use(
  (config) => {
    // Здесь мы потом будем доставать Access-токен из Zustand и подставлять его в заголовки
    // const token = useAuthStore.getState().token;
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    console.log('🚀 Отправляем запрос:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехватчик для ответов (ОБРАБОТКА ОШИБОК)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Если сервер вернул 401 (Unauthorized), значит токен протух.
    // Здесь мы потом напишем логику автоматического обновления токена (refresh).
    if (error.response?.status === 401) {
      console.warn('Токен протух или неверный!');
    }
    return Promise.reject(error);
  }
);