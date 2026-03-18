import type { Booking } from '../types/booking.types';
import { formatDate } from '../lib/formatters';
import QRDisplay from './QRDisplay';

interface PassCardProps {
  booking: Booking;
  onCancel?: (bookingId: string) => void;
}

export default function PassCard({ booking, onCancel }: PassCardProps) {
  const statusColors: Record<string, { bg: string; text: string }> = {
    confirmed: { bg: '#dcfce7', text: '#15803d' },
    pending: { bg: '#fef9c3', text: '#854d0e' },
    cancelled: { bg: '#fee2e2', text: '#b91c1c' },
    used: { bg: '#f3f4f6', text: '#6b7280' },
  };
  const colors = statusColors[booking.status] ?? statusColors.pending;

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', padding: 16, color: '#fff' }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{booking.eventTitle}</h3>
        <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.9 }}>📅 {formatDate(booking.eventDate)}</p>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: '#6b7280' }}>Booking #{booking.id.slice(-8)}</span>
          <span style={{
            background: colors.bg,
            color: colors.text,
            borderRadius: 20,
            padding: '2px 10px',
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'capitalize',
          }}>
            {booking.status}
          </span>
        </div>
        {booking.qrCode && booking.status === 'confirmed' && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
            <QRDisplay value={booking.qrCode} size={150} />
          </div>
        )}
        {onCancel && (booking.status === 'pending' || booking.status === 'confirmed') && (
          <button
            onClick={() => onCancel(booking.id)}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: 8,
              background: '#fee2e2',
              color: '#b91c1c',
              border: '1px solid #fca5a5',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
}
