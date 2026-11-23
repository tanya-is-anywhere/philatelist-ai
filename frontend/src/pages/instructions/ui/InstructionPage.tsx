import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui';
import { useAuthStore } from '../../../entities/user/model/store';
import styles from './InstructionPage.module.css';

export const InstructionPage = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.accessToken);
  const handleStart = () => {
    if (token) {
      navigate('/upload');
    } else {
      navigate('/login');
    }
  };

  const steps = [
    { icon: '📸', title: '1. Сфотографируйте марку', text: 'Сделайте четкое фото одной марки или целого листа из альбома.' },
    { icon: '⚙️', title: '2. Выберите вариант обработки', text: 'Наш ИИ поймет, сколько марок на фото, и предложит нужный режим.' },
    { icon: '✨', title: '3. Нажмите «Распознать»', text: 'Получите оценку каждой марки и общую стоимость вашей коллекции.' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Как это работает?</h1>
      <p className={styles.subheading}>Всего три шага до оценки вашей коллекции</p>

      <div className={styles.stepsGrid}>
        {steps.map((step, index) => (
          <div key={index} className={styles.stepCard}>
            <div className={styles.icon}>{step.icon}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepText}>{step.text}</p>
          </div>
        ))}
      </div>

      <Button onClick={handleStart} className={styles.startBtn}>
        Приступить к работе
      </Button>
    </div>
  );
};