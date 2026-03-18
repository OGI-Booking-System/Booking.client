interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export default function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  return (
    <div
      role="alert"
      style={{
        background: '#fee2e2',
        border: '1px solid #f87171',
        borderRadius: 8,
        padding: '12px 16px',
        color: '#b91c1c',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
      }}
    >
      <span style={{ flex: 1 }}>⚠️ {message}</span>
      {onClose && (
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b91c1c', fontSize: 18 }}>
          ×
        </button>
      )}
    </div>
  );
}
