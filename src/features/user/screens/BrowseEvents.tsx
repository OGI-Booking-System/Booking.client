import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../redux/store';
import { fetchEvents } from '../../../redux/eventsSlice';
import type { Event } from '../../../types/event.types';
import { ROUTES } from '../../../config/app.constants';
import EventCard from '../../../components/EventCard';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';

export default function BrowseEvents() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { events, isLoading, error } = useSelector((state: RootState) => state.events);
  const [search, setSearch] = useState('');

  useEffect(() => {
    void dispatch(fetchEvents());
  }, [dispatch]);

  const handleBook = (eventId: string) => {
    navigate(ROUTES.USER.BOOK_PASS.replace(':eventId', eventId));
  };

  const filtered = events.filter((e: Event) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#111827' }}>Browse Events 🎪</h1>
      <p style={{ margin: '0 0 20px', color: '#6b7280' }}>Find and book your next event pass</p>

      <input
        type="search"
        placeholder="Search events by name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%', maxWidth: 480, padding: '10px 14px', border: '1px solid #d1d5db',
          borderRadius: 8, fontSize: 14, marginBottom: 24, boxSizing: 'border-box',
        }}
      />

      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}
      {!isLoading && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>
          <div style={{ fontSize: 56 }}>🔍</div>
          <p>No events found{search ? ` for "${search}"` : ''}.</p>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} onBook={handleBook} />
        ))}
      </div>
    </div>
  );
}
