import { type User } from '../../../entities/user/model/types';
import { axiosInstance } from '../../../shared/api/axiosInstance';

// Типы ответов бэкенда (см. backend/app/db/schemas.py)
export interface UserResponse {
  id: string;
  email: string;
  is_active: boolean;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export const authApi = {
  // Бэкенд отвечает UserResponse: только id и email, без токенов
  register: async (email: string, password: string): Promise<UserResponse> => {
    const { data } = await axiosInstance.post<UserResponse>('/api/v1/auth/register', {
      email,
      password,
    });
    return data;
  },

  // Бэкенд отвечает TokenResponse: пара токенов, без объекта user
  login: async (email: string, password: string): Promise<TokenResponse> => {
    const { data } = await axiosInstance.post<TokenResponse>('/api/v1/auth/login', {
      email,
      password,
      // TODO(captcha): согласовать с Викторией формат токена.
      // Схема UserLogin принимает captcha_token: string | null
      captcha_token: 'string',
    });
    return data;
  },
};
