import { useState } from 'react';
import { type Stamp } from '../../../entities/stamp/model/types';
import { StampCard } from '../../../entities/stamp/ui/StampCard';
import { ImageWithBboxes } from './ImageWithBboxes';
import { Modal } from '../../../shared/ui';
import styles from './ResultsPanel.module.css';

interface ResultsPanelProps {
  imageUrl: string;
  stamps: Stamp[];
}

export const ResultsPanel = ({ imageUrl, stamps }: ResultsPanelProps) => {
  const [selectedStamp, setSelectedStamp] = useState<Stamp | null>(null);
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
            <div key={stamp.id} onClick={() => setSelectedStamp(stamp)} style={{ cursor: 'pointer' }}>
              <StampCard stamp={stamp} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно */}
      <Modal isOpen={!!selectedStamp} onClose={() => setSelectedStamp(null)}>
        {selectedStamp && (
          <div style={{ padding: '20px' }}>
            <h3>{selectedStamp.name}</h3>
            <p>{selectedStamp.country}, {selectedStamp.year}</p>
            <p style={{ fontSize: '24px', color: '#E85D35', fontWeight: 'bold' }}>
              {selectedStamp.price.toLocaleString('ru-RU')} ₽
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};