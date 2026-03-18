import type { Event } from '../types/event.types';
import { formatDate, formatCurrency, truncateText } from '../lib/formatters';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/app.constants';

interface EventCardProps {
  event: Event;
  onBook?: (eventId: string) => void;
  showActions?: boolean;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
}

export default function EventCard({ event, onBook, showActions, onEdit, onDelete }: EventCardProps) {
  const isAvailable = event.availableSeats > 0 && event.status === 'upcoming';

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'box-shadow 0.2s',
    }}>
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
      )}
      {!event.imageUrl && (
        <div style={{ width: '100%', height: 100, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize: 32 }}>
          🎫
        </div>
      )}
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#111827' }}>{event.title}</h3>
          <span style={{
            background: isAvailable ? '#dcfce7' : '#fee2e2',
            color: isAvailable ? '#15803d' : '#b91c1c',
            borderRadius: 20,
            padding: '2px 8px',
            fontSize: 12,
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}>
            {isAvailable ? `${event.availableSeats} left` : event.status}
          </span>
        </div>
        <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 8px' }}>{truncateText(event.description, 100)}</p>
        <div style={{ fontSize: 13, color: '#374151', display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
          <span>📍 {event.location}</span>
          <span>📅 {formatDate(event.date)}</span>
          <span>💰 {formatCurrency(event.price)}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {onBook && (
            <button
              onClick={() => onBook(event.id)}
              disabled={!isAvailable}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: isAvailable ? '#6366f1' : '#e5e7eb',
                color: isAvailable ? '#fff' : '#9ca3af',
                border: 'none',
                borderRadius: 8,
                cursor: isAvailable ? 'pointer' : 'not-allowed',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Book Now
            </button>
          )}
          {!onBook && (
            <Link
              to={ROUTES.USER.BROWSE_EVENTS}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: '#6366f1',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              View Details
            </Link>
          )}
          {showActions && onEdit && (
            <button
              onClick={() => onEdit(event)}
              style={{ padding: '8px 12px', background: '#f3f4f6', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}
            >
              ✏️
            </button>
          )}
          {showActions && onDelete && (
            <button
              onClick={() => onDelete(event.id)}
              style={{ padding: '8px 12px', background: '#fee2e2', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
