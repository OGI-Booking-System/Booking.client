interface SuccessAlertProps {
  message: string;
  onClose?: () => void;
}

export default function SuccessAlert({ message, onClose }: SuccessAlertProps) {
  return (
    <div
      role="alert"
      style={{
        background: '#dcfce7',
        border: '1px solid #4ade80',
        borderRadius: 8,
        padding: '12px 16px',
        color: '#15803d',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
      }}
    >
      <span style={{ flex: 1 }}>✅ {message}</span>
      {onClose && (
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#15803d', fontSize: 18 }}>
          ×
        </button>
      )}
    </div>
  );
}
