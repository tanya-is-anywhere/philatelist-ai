import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

// Функция применения темы: ставит атрибут на <html>,
// чтобы совпасть с селектором :root / [data-theme="dark"] из variables.css
export const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

export const useThemeStore = create<ThemeState>()(
  // persist сохраняет тему в localStorage — выбор не сбросится после F5
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        set({ theme: newTheme });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// Вызывается один раз при старте приложения:
// восстанавливает сохранённую тему до первого рендера
export const initTheme = () => {
  applyTheme(useThemeStore.getState().theme);
};
