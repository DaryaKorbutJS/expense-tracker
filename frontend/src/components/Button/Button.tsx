import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonType  = 'primary' | 'ghost' | 'link';
type ButtonSize  = 'small'   | 'medium' | 'large';
type ButtonShape = 'default' | 'round';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
  size?: ButtonSize;
  shape?: ButtonShape;
}

export const Button: React.FC<ButtonProps> = ({
  buttonType = 'primary',
  size       = 'small',
  shape      = 'default',
  disabled   = false,
  children,
  className  = '',
  type       = 'button',
  ...rest
}) => {
  const classes = [
    styles.button,
    styles[buttonType],
    styles[size],
    shape === 'round' ? styles.round : '',
    disabled ? styles.disabled : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
