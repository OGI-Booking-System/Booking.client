import { QRCodeSVG } from 'qrcode.react';
import type { BookingPass } from '../types/booking';
import { formatDate, formatDateTime } from '../utils/formatters';

interface PassCardProps {
  pass: BookingPass;
  onCancel?: (passId: string) => void;
}

const statusClass: Record<string, string> = {
  active: 'badge-active',
  used: 'badge-used',
  expired: 'badge-expired',
  cancelled: 'badge-cancelled',
};

export function PassCard({ pass, onCancel }: PassCardProps) {
  return (
    <div className="pass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="pass-card-title">{pass.event.title}</div>
          <div className="pass-card-event">{pass.event.location}</div>
          <span className={`pass-status-badge ${statusClass[pass.status] || ''}`}>
            {pass.status}
          </span>
          <div className="pass-card-meta" style={{ marginTop: '0.75rem' }}>
            <span>📅 {formatDate(pass.event.date)}</span>
            <span>🎟️ Booked {formatDateTime(pass.bookedAt)}</span>
          </div>
          {pass.status === 'active' && onCancel && (
            <button
              className="btn btn-sm"
              style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', marginTop: '0.5rem' }}
              onClick={() => onCancel(pass.id)}
            >
              Cancel Pass
            </button>
          )}
        </div>
        <div className="pass-card-qr" style={{ marginLeft: '1rem', flexShrink: 0 }}>
          <QRCodeSVG
            value={pass.qrCode}
            size={80}
            level="M"
            aria-label={`QR code for ${pass.event.title}`}
          />
        </div>
      </div>
    </div>
  );
}
