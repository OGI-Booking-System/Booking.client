import { useState } from 'react';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div className="alert alert-error" role="alert">
      <span>⚠️</span>
      <span>{message}</span>
      <button className="alert-close" aria-label="Dismiss" onClick={handleClose}>
        ✕
      </button>
    </div>
  );
}
