import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {/* Слой с твоим фоновым изображением header.png */}
      <div className={styles.background}></div>

      {/* Обертка для логотипа и подложки */}
      <div className={styles.logoWrapper} onClick={() => navigate('/')}>
        {/* Сама белая подложка с блюром */}
        <div className={styles.logoBackground}></div>

        {/* Текст */}
        <span className={styles.logo}>Филателист AI</span>
      </div>
    </header>
  );
};