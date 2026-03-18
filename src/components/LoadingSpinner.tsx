import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export default function LoadingSpinner({ size = 'md', fullScreen = false }: LoadingSpinnerProps) {
  const spinner = <div className={`${styles.spinner} ${styles[size]}`} />;

  if (fullScreen) {
    return <div className={styles.overlay}>{spinner}</div>;
  }

  return spinner;
}
