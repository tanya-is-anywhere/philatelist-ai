import React, { InputHTMLAttributes, useState } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isPassword?: boolean; // Если это пароль, покажем иконку глаза
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  isPassword,
  type = 'text',
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          type={inputType}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Скрыть' : 'Показать'}
          </button>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};