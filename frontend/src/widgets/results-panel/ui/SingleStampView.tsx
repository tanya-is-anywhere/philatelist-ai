import { type Stamp } from '../../../entities/stamp/model/types';
import { Button } from '../../../shared/ui';
import styles from './SingleStampView.module.css';

interface SingleStampViewProps {
  stamp: Stamp;
  imageUrl: string;
}

export const SingleStampView = ({ stamp, imageUrl }: SingleStampViewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={imageUrl} alt="Stamp" className={styles.mainImage} />
      </div>

      <div className={styles.infoSection}>
        <h1 className={styles.name}>{stamp.name}</h1>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.label}>Страна:</span>
            <span className={styles.value}>{stamp.country}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.label}>Год:</span>
            <span className={styles.value}>{stamp.year}</span>
          </div>
        </div>

        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>Ориентировочная стоимость:</span>
          <span className={styles.priceValue}>{stamp.price.toLocaleString('ru-RU')} ₽</span>
        </div>

        <Button className={styles.saveBtn}>
          Сохранить в коллекцию
        </Button>
      </div>
    </div>
  );
};