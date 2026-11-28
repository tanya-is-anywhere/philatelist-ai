import { StampCard } from '../../../entities/stamp/ui/StampCard';
import { type Stamp } from '../../../entities/stamp/model/types';
import styles from './CollectionPage.module.css';

// Моковые данные для коллекции
const MOCK_COLLECTION: Stamp[] = [
  { id: '1', name: 'Космос. Гагарин', price: 2500, country: 'СССР', year: 1961, bbox: [0,0,0,0] },
  { id: '2', name: 'Двуглавый орел', price: 1500, country: 'РИ', year: 1913, bbox: [0,0,0,0] },
  { id: '3', name: 'Туризм в СССР', price: 350, country: 'СССР', year: 1975, bbox: [0,0,0,0] },
  { id: '4', name: 'Олимпиада 80', price: 800, country: 'СССР', year: 1980, bbox: [0,0,0,0] },
  { id: '5', name: 'Пушкин', price: 1200, country: 'СССР', year: 1937, bbox: [0,0,0,0] },
];

export const CollectionPage = () => {
  const totalPrice = MOCK_COLLECTION.reduce((sum, stamp) => sum + stamp.price, 0);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Моя коллекция</h1>
          <p className={styles.subheading}>Все ваши сохраненные марки</p>
        </div>
        <div className={styles.totalBox}>
          <span>Общая стоимость:</span>
          <strong>{totalPrice.toLocaleString('ru-RU')} ₽</strong>
        </div>
      </div>

      <div className={styles.grid}>
        {MOCK_COLLECTION.map((stamp, index) => (
          <StampCard key={stamp.id} stamp={stamp} index={index} />
        ))}
      </div>
    </div>
  );
};