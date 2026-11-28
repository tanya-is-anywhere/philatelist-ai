import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui';
import styles from './SettingsPage.module.css';
import { useThemeStore } from '../../../entities/user/model/themeStore';

export const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Настройки</h1>

        <div className={styles.settingRow}>
          <span>Темная тема</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        {/* Новый блок с кнопкой */}
        <div className={styles.settingRow} style={{ borderBottom: 'none', marginBottom: '16px' }}>
          <span>Нужна помощь?</span>
          <Button variant="secondary" onClick={() => navigate('/instructions')}>
            Инструкция
          </Button>
        </div>

        <p className={styles.comingSoon}>
          Дополнительные настройки (выбор моделей ИИ, смена валюты) появятся в следующем обновлении.
        </p>
      </div>
    </div>
  );
};