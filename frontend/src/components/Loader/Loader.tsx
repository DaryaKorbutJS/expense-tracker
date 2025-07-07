import styles from './Loader.module.css';
import LoaderSvg from '../../assets/loader.svg?react';

export const Loader = () => (
  <span
    role="status"
    aria-label="Loading…"
  >
    <LoaderSvg
      className={styles.loader}
      aria-hidden="true"
      focusable="false"
    />
  </span>
);
