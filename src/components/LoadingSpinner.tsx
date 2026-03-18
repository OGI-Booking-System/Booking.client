interface LoadingSpinnerProps {
  size?: 'sm' | 'md';
  label?: string;
}

export function LoadingSpinner({ size = 'md', label = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="spinner-wrapper" role="status" aria-live="polite">
      <div className={`spinner ${size === 'sm' ? 'spinner-sm' : ''}`} />
      {size !== 'sm' && <span className="text-muted">{label}</span>}
      <span className="sr-only">{label}</span>
    </div>
  );
}
