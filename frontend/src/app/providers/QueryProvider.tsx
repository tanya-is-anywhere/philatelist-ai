import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Создаем клиент кэша
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Если запрос упал с ошибкой, TanStack Query попробует повторить его 1 раз
      retry: 1,
      // Отключаем автоматическую перезагрузку данных при переключении вкладок в браузере
      refetchOnWindowFocus: false,
      // Данные будут считаться "свежими" 5 минут (потом обновятся)
      staleTime: 5 * 60 * 1000,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};