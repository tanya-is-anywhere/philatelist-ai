import { type Stamp } from '../model/types';
import styles from './StampCard.module.css';

interface StampCardProps {
  stamp: Stamp;
  index: number;
}

export const StampCard = ({ stamp, index }: StampCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.number}>{index + 1}</span>
        <h3 className={styles.name}>{stamp.name}</h3>
      </div>
      <div className={styles.details}>
        <span>{stamp.country}, {stamp.year}</span>
      </div>
      <div className={styles.price}>
        {stamp.price.toLocaleString('ru-RU')} ₽
      </div>
    </div>
  );
};