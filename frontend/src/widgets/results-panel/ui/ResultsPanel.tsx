import { type Stamp } from '../../../entities/stamp/model/types';
import { StampCard } from '../../../entities/stamp/ui/StampCard';
import { ImageWithBboxes } from './ImageWithBboxes';
import styles from './ResultsPanel.module.css';

interface ResultsPanelProps {
  imageUrl: string;
  stamps: Stamp[];
}

export const ResultsPanel = ({ imageUrl, stamps }: ResultsPanelProps) => {
  const totalPrice = stamps.reduce((sum, stamp) => sum + stamp.price, 0);

  return (
    <div className={styles.panel}>
      <div className={styles.left}>
        <ImageWithBboxes imageUrl={imageUrl} stamps={stamps} />
      </div>

      <div className={styles.right}>
        <div className={styles.summary}>
          <h2>Найдено марок: {stamps.length}</h2>
          <div className={styles.total}>
            <span>Общая стоимость:</span>
            <strong>{totalPrice.toLocaleString('ru-RU')} ₽</strong>
          </div>
        </div>

        <div className={styles.list}>
          {stamps.map((stamp, index) => (
            <StampCard key={stamp.id} stamp={stamp} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};