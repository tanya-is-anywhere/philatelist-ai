import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Dropzone.module.css';
import { Button } from '../../../shared/ui';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export const Dropzone = ({ onFileSelect, isLoading = false }: DropzoneProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
    disabled: isLoading,
  });

  return (
    <div
      {...getRootProps()}
      className={`${styles.dropzone} ${isDragActive ? styles.active : ''} ${isLoading ? styles.disabled : ''}`}
    >
      <input {...getInputProps()} />

      {preview ? (
        <div className={styles.previewContainer}>
          <img src={preview} alt="Preview" className={styles.previewImage} />
          <p className={styles.previewText}>Файл выбран. Нажмите «Распознать»</p>
        </div>
      ) : (
        <div className={styles.placeholder}>
          <p className={styles.title}>
            {isDragActive ? 'Отпустите файл...' : 'Перетащите фото сюда'}
          </p>
          <p className={styles.subtitle}>или нажмите, чтобы выбрать файл</p>
          <Button variant="secondary" style={{ marginTop: '20px' }} disabled={isLoading}>
            Выбрать файл
          </Button>
        </div>
      )}
    </div>
  );
};