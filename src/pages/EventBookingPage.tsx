import { useEffect, useState } from 'react';
import { useProtected } from '../hooks/useProtected';
import { useBooking } from '../hooks/useBooking';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';
import { SuccessAlert } from '../components/SuccessAlert';
import { formatDate, formatCurrency } from '../utils/formatters';
import type { Event } from '../types/booking';

export function EventBookingPage() {
  useProtected();
  const { events, isLoading, error, fetchEvents, bookEvent } = useBooking();
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleBook = async (event: Event) => {
    setBookingError(null);
    setSuccess(null);
    setBookingId(event.id);
    const ok = await bookEvent(event.id);
    setBookingId(null);
    if (ok) {
      setSuccess(`Successfully booked a pass for "${event.title}"!`);
    } else {
      setBookingError(`Failed to book "${event.title}". Please try again.`);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Browse Events 🎉</h1>
          <p className="text-muted">Find and book passes for upcoming events.</p>
        </div>

        {error && <ErrorAlert message={error} />}
        {bookingError && <ErrorAlert message={bookingError} onClose={() => setBookingError(null)} />}
        {success && <SuccessAlert message={success} onClose={() => setSuccess(null)} />}

        {isLoading ? (
          <LoadingSpinner label="Loading events..." />
        ) : events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <p className="empty-state-text">No events available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-card-image">🎪</div>
                <div className="event-card-body">
                  <h3 className="event-card-title">{event.title}</h3>
                  <div className="event-card-meta">
                    <span>📅 {formatDate(event.date)}</span>
                    <span>📍 {event.location}</span>
                    <span>🎟️ {event.availableSlots} / {event.capacity} slots left</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                    {event.description}
                  </p>
                  <div className="event-card-price">
                    {event.price === 0 ? 'Free' : formatCurrency(event.price)}
                  </div>
                  <button
                    className="btn btn-primary btn-full"
                    disabled={
                      event.availableSlots === 0 ||
                      isLoading ||
                      bookingId === event.id
                    }
                    onClick={() => handleBook(event)}
                  >
                    {bookingId === event.id ? (
                      <LoadingSpinner size="sm" label="Booking..." />
                    ) : event.availableSlots === 0 ? (
                      'Sold Out'
                    ) : (
                      'Book Pass'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
