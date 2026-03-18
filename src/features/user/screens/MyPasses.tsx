import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store';
import { fetchMyBookings, cancelBooking } from '../../../redux/bookingSlice';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import PassCard from '../../../components/PassCard';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config/app.constants';

export default function MyPasses() {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, isLoading, error } = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    void dispatch(fetchMyBookings());
  }, [dispatch]);

  const handleCancel = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      void dispatch(cancelBooking(bookingId));
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#111827' }}>My Passes 🎫</h1>
          <p style={{ margin: '4px 0 0', color: '#6b7280' }}>Manage your event passes and QR codes</p>
        </div>
        <Link to={ROUTES.USER.BROWSE_EVENTS} style={{ padding: '8px 16px', background: '#6366f1', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
          + Book New Pass
        </Link>
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      {!isLoading && bookings.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>
          <div style={{ fontSize: 56 }}>🎫</div>
          <h3 style={{ color: '#6b7280' }}>No passes yet</h3>
          <p>Book your first event to get started!</p>
          <Link to={ROUTES.USER.BROWSE_EVENTS} style={{ padding: '10px 24px', background: '#6366f1', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 500 }}>
            Browse Events
          </Link>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
        {bookings.map((booking) => (
          <PassCard key={booking.id} booking={booking} onCancel={handleCancel} />
        ))}
      </div>
    </div>
  );
}
