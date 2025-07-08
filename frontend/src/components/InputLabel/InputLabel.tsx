import styles from './InputLabel.module.css';

interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const InputLabel: React.FC<InputLabelProps> = ({
  htmlFor,
  required = false,
  children,
  className = '',
  ...rest
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${styles.label} ${className}`.trim()}
      {...rest}
    >
      {children}
      {required && <span className={styles.required} aria-hidden="true">*</span>}
    </label>
  );
};
