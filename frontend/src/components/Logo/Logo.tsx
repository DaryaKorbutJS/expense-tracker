import styles from './Logo.module.css';
import LogoSvg from '../../assets/logo-light.svg?react';

export const Logo = () => {
  return (
    <span className={styles.logo} role="img" aria-label="Company logo">
      <LogoSvg width="auto" height="auto" aria-hidden="true" focusable="false" />
    </span>
  );
}