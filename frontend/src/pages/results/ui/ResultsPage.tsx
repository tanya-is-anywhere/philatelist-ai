import { ResultsPanel } from '../../../widgets/results-panel/ui/ResultsPanel';
import { type Stamp } from '../../../entities/stamp/model/types';
import styles from './ResultsPage.module.css';

const MOCK_STAMPS: Stamp[] = [
  { id: '1', name: 'Космос. Гагарин', price: 2500, country: 'СССР', year: 1961, bbox: [10, 10, 30, 20] },
  { id: '2', name: 'Двуглавый орел', price: 1500, country: 'РИ', year: 1913, bbox: [50, 15, 25, 25] },
  { id: '3', name: 'Туризм в СССР', price: 350, country: 'СССР', year: 1975, bbox: [15, 50, 35, 20] },
  { id: '4', name: 'Олимпиада 80', price: 800, country: 'СССР', year: 1980, bbox: [60, 60, 20, 25] },
];

const MOCK_IMAGE = 'https://images.unsplash.com/photo-1598204369539-4b9d1c0b11bb?auto=format&fit=crop&q=80&w=800';

export const ResultsPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Результаты распознавания</h1>
      <ResultsPanel imageUrl={MOCK_IMAGE} stamps={MOCK_STAMPS} />
    </div>
  );
};