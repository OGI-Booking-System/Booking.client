import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../redux/store';
import { fetchMyBookings } from '../../../redux/bookingSlice';
import { fetchEvents } from '../../../redux/eventsSlice';
import { ROUTES } from '../../../config/app.constants';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import PassCard from '../../../components/PassCard';

export default function UserDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { bookings, isLoading: bookingsLoading, error: bookingsError } = useSelector((state: RootState) => state.bookings);
  const { events } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    void dispatch(fetchMyBookings());
    void dispatch(fetchEvents());
  }, [dispatch]);

  const upcomingBookings = bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending');

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#111827' }}>
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p style={{ margin: '4px 0 0', color: '#6b7280' }}>Here's what's happening with your passes.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total Bookings', value: bookings.length, icon: '🎫', color: '#6366f1' },
          { label: 'Upcoming', value: upcomingBookings.length, icon: '📅', color: '#059669' },
          { label: 'Available Events', value: events.filter((e) => e.status === 'upcoming').length, icon: '🎪', color: '#d97706' },
        ].map((stat) => (
          <div key={stat.label} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
        <Link to={ROUTES.USER.BROWSE_EVENTS} style={actionBtnStyle('#6366f1')}>🔍 Browse Events</Link>
        <Link to={ROUTES.USER.MY_PASSES} style={actionBtnStyle('#059669')}>🎫 My Passes</Link>
        <Link to={ROUTES.USER.VERIFICATION} style={actionBtnStyle('#d97706')}>📷 Verify Pass</Link>
      </div>

      {/* Recent Bookings */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Recent Bookings</h2>
          <Link to={ROUTES.USER.MY_PASSES} style={{ color: '#6366f1', fontSize: 14 }}>View all →</Link>
        </div>
        {bookingsLoading && <LoadingSpinner />}
        {bookingsError && <ErrorAlert message={bookingsError} />}
        {!bookingsLoading && bookings.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>
            <div style={{ fontSize: 48 }}>🎫</div>
            <p>No bookings yet. <Link to={ROUTES.USER.BROWSE_EVENTS} style={{ color: '#6366f1' }}>Browse events</Link> to get started!</p>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
          {bookings.slice(0, 3).map((booking) => (
            <PassCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
}

const actionBtnStyle = (bg: string): React.CSSProperties => ({
  padding: '10px 20px',
  background: bg,
  color: '#fff',
  borderRadius: 8,
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
});
