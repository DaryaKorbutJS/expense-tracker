import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

export const Input = ({
  error = false,
  helperText = '',
  className = '',
  ...rest
}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        aria-invalid={error}
        className={[
          styles.input,
          error ? styles.error : '',
          className
        ].filter(Boolean).join(' ')}
        {...rest}
      />
      {helperText && (
        <span className={error ? styles.helperError : styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
};
