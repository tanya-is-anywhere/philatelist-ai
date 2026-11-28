import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropzone } from '../../../features/upload/ui/Dropzone';
import { Button } from '../../../shared/ui';
import styles from './UploadPage.module.css';

export const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRecognize = () => {
    if (!selectedFile) return;

    setIsLoading(true);
    // Временно делаем вид, что распознаем, и перекидываем на результаты
    setTimeout(() => {
      setIsLoading(false);
      navigate('/results');
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Загрузите фото марок</h1>
      <p className={styles.subheading}>Наш ИИ найдет и оценит каждую марку на изображении</p>

      <div className={styles.content}>
        <Dropzone
          onFileSelect={(file) => setSelectedFile(file)}
          isLoading={isLoading}
        />

        {selectedFile && (
          <div className={styles.actions}>
            <Button
              onClick={handleRecognize}
              isLoading={isLoading}
              className={styles.recognizeBtn}
            >
              Распознать марки
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};