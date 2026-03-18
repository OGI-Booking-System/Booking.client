import { QRCodeSVG } from 'qrcode.react';

interface QRDisplayProps {
  value: string;
  size?: number;
  title?: string;
}

export default function QRDisplay({ value, size = 200, title }: QRDisplayProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {title && <p style={{ margin: 0, fontWeight: 600, color: '#374151' }}>{title}</p>}
      <div style={{ padding: 12, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <QRCodeSVG value={value} size={size} />
      </div>
    </div>
  );
}
