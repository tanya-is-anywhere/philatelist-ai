import { type Stamp } from '../../../entities/stamp/model/types';
import styles from './ImageWithBboxes.module.css';

interface ImageWithBboxesProps {
  imageUrl: string;
  stamps: Stamp[];
}

export const ImageWithBboxes = ({ imageUrl, stamps }: ImageWithBboxesProps) => {
  return (
    <div className={styles.container}>
      <img src={imageUrl} alt="Uploaded" className={styles.image} />

      {stamps.map((stamp, index) => (
        <div
          key={stamp.id}
          className={styles.bbox}
          style={{
            // Предполагаем, что координаты в процентах от ширины/высоты картинки
            left: `${stamp.bbox[0]}%`,
            top: `${stamp.bbox[1]}%`,
            width: `${stamp.bbox[2]}%`,
            height: `${stamp.bbox[3]}%`,
          }}
        >
          <span className={styles.bboxNumber}>{index + 1}</span>
        </div>
      ))}
    </div>
  );
};