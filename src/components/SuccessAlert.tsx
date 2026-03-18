import { useState } from 'react';

interface SuccessAlertProps {
  message: string;
  onClose?: () => void;
}

export function SuccessAlert({ message, onClose }: SuccessAlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div className="alert alert-success" role="status">
      <span>✅</span>
      <span>{message}</span>
      <button className="alert-close" aria-label="Dismiss" onClick={handleClose}>
        ✕
      </button>
    </div>
  );
}
