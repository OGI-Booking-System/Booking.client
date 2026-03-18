import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store';
import { fetchEventById } from '../../../redux/eventsSlice';
import { createBooking, clearBookingError } from '../../../redux/bookingSlice';
import { ROUTES } from '../../../config/app.constants';
import { formatDate, formatCurrency } from '../../../lib/formatters';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import SuccessAlert from '../../../components/SuccessAlert';
import QRDisplay from '../../../components/QRDisplay';

export default function BookPass() {
  const { eventId } = useParams<{ eventId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentEvent, isLoading: eventLoading } = useSelector((state: RootState) => state.events);
  const { isLoading: bookingLoading, error, currentBooking } = useSelector((state: RootState) => state.bookings);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (eventId) void dispatch(fetchEventById(eventId));
  }, [dispatch, eventId]);

  const handleBook = async () => {
    if (!eventId) return;
    const result = await dispatch(createBooking({ eventId }));
    if (createBooking.fulfilled.match(result)) {
      setConfirmed(true);
    }
  };

  if (eventLoading) return <LoadingSpinner fullScreen />;

  if (confirmed && currentBooking) {
    return (
      <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 16px', textAlign: 'center' }}>
        <SuccessAlert message="Booking confirmed! Your pass QR code is below." />
        <h2 style={{ color: '#111827' }}>🎉 Booking Confirmed!</h2>
        <p style={{ color: '#6b7280' }}>{currentBooking.eventTitle}</p>
        {currentBooking.qrCode && <QRDisplay value={currentBooking.qrCode} size={200} title="Your Pass QR Code" />}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
          <button onClick={() => navigate(ROUTES.USER.MY_PASSES)} style={btnStyle('#6366f1')}>View My Passes</button>
          <button onClick={() => navigate(ROUTES.USER.BROWSE_EVENTS)} style={btnStyle('#6b7280')}>Browse More Events</button>
        </div>
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 16px', textAlign: 'center' }}>
        <ErrorAlert message="Event not found." />
        <button onClick={() => navigate(ROUTES.USER.BROWSE_EVENTS)} style={btnStyle('#6366f1')}>Back to Events</button>
      </div>
    );
  }

  const isAvailable = currentEvent.availableSeats > 0 && currentEvent.status === 'upcoming';

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', padding: '0 16px' }}>
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', padding: 24, color: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: 22 }}>{currentEvent.title}</h2>
          <p style={{ margin: '8px 0 0', opacity: 0.9 }}>📍 {currentEvent.location}</p>
        </div>
        <div style={{ padding: 24 }}>
          <p style={{ color: '#374151', marginTop: 0 }}>{currentEvent.description}</p>
          <div style={{ background: '#f9fafb', borderRadius: 8, padding: 16, marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['📅 Date', formatDate(currentEvent.date)],
                ['🏁 End', formatDate(currentEvent.endDate)],
                ['💰 Price', formatCurrency(currentEvent.price)],
                ['🪑 Available', `${currentEvent.availableSeats} seats`],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
          {error && <ErrorAlert message={error} onClose={() => dispatch(clearBookingError())} />}
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => navigate(-1)} style={btnStyle('#6b7280')}>← Back</button>
            <button onClick={handleBook} disabled={!isAvailable || bookingLoading} style={{ ...btnStyle('#6366f1'), flex: 1, opacity: isAvailable ? 1 : 0.5 }}>
              {bookingLoading ? <LoadingSpinner size="sm" /> : isAvailable ? `Book for ${formatCurrency(currentEvent.price)}` : 'Not Available'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const btnStyle = (bg: string): React.CSSProperties => ({
  padding: '10px 20px', background: bg, color: '#fff', border: 'none', borderRadius: 8,
  cursor: 'pointer', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
});
