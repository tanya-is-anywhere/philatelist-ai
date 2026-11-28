import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type User } from './types';

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  // Основной метод после login/register: сохраняет пользователя и access-токен
  setAuth: (user: User, token: string) => void;
  // Сохраняет пару токенов (нужна для useRefreshToken)
  setTokens: (accessToken: string, refreshToken: string) => void;
  // Алиас для мест, где меняются только данные пользователя
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<UserState>()(
  // persist автоматически пишет и читает состояние из localStorage
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (user, token) => set({ user, accessToken: token }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'user-storage', // ключ в localStorage — оставила старый, чтобы не ломать Header
      storage: createJSONStorage(() => localStorage),
    },
  ),
);