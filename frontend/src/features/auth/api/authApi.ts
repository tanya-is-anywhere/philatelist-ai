import { axiosInstance } from '../../../shared/api/axiosInstance';
import { type User } from '../../../entities/user/model/types';

// Это реальные данные
// export const authApi = {
//   login: async (email: string, password: string) => {
//     const response = await axiosInstance.post('/auth/login', { email, password });
//     return response.data;
//   },
//   register: async (email: string, password: string) => {
//     const response = await axiosInstance.post('/auth/register', { email, password });
//     return response.data;
//   },
// };

// Это временная заглушка, если бэкенд еще не готов
export const authApi = {
  login: async (email: string, password: string) => {
    // ВРЕМЕННАЯ ЗАГЛУШКА (пока бэкенд не готов)
    // Возвращаем фейковые данные
    return {
      access_token: 'fake-jwt-token-12345',
      user: { id: '1', email: email }
    };

    // РЕАЛЬНЫЙ ЗАПРОС (раскомментируй, когда Виктория сделает бэкенд)
    // const response = await axiosInstance.post('/api/v1/auth/login', { email, password });
    // return response.data;
  },

  register: async (email: string, password: string) => {
    // ВРЕМЕННАЯ ЗАГЛУШКА
    return {
      access_token: 'fake-jwt-token-12345',
      user: { id: '2', email: email }
    };
  },
};
