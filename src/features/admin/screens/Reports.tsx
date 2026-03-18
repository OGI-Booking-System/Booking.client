import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store';
import { fetchEvents } from '../../../redux/eventsSlice';
import { formatDate, formatCurrency } from '../../../lib/formatters';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default function Reports() {
  const dispatch = useDispatch<AppDispatch>();
  const { events, isLoading } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    void dispatch(fetchEvents());
  }, [dispatch]);

  const totalCapacity = events.reduce((sum, e) => sum + e.capacity, 0);
  const totalBooked = events.reduce((sum, e) => sum + (e.capacity - e.availableSeats), 0);
  const totalRevenue = events.reduce((sum, e) => sum + (e.capacity - e.availableSeats) * e.price, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalBooked / totalCapacity) * 100) : 0;

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#111827' }}>Reports 📊</h1>
      <p style={{ margin: '0 0 24px', color: '#6b7280' }}>Booking and event analytics</p>

      {isLoading ? <LoadingSpinner /> : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Total Events', value: events.length, icon: '🎪', color: '#6366f1' },
              { label: 'Total Capacity', value: totalCapacity, icon: '🪑', color: '#059669' },
              { label: 'Total Booked', value: totalBooked, icon: '🎫', color: '#d97706' },
              { label: 'Occupancy Rate', value: `${occupancyRate}%`, icon: '📈', color: '#7c3aed' },
              { label: 'Est. Revenue', value: formatCurrency(totalRevenue), icon: '💰', color: '#0891b2' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Events Breakdown</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  {['Event', 'Date', 'Capacity', 'Booked', 'Available', 'Revenue', 'Status'].map((h) => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#6b7280' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  const booked = event.capacity - event.availableSeats;
                  const revenue = booked * event.price;
                  return (
                    <tr key={event.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 500 }}>{event.title}</td>
                      <td style={{ padding: '10px 14px', fontSize: 13, color: '#6b7280' }}>{formatDate(event.date)}</td>
                      <td style={{ padding: '10px 14px', fontSize: 13 }}>{event.capacity}</td>
                      <td style={{ padding: '10px 14px', fontSize: 13 }}>{booked}</td>
                      <td style={{ padding: '10px 14px', fontSize: 13 }}>{event.availableSeats}</td>
                      <td style={{ padding: '10px 14px', fontSize: 13 }}>{formatCurrency(revenue)}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ background: event.status === 'upcoming' ? '#dcfce7' : '#f3f4f6', color: event.status === 'upcoming' ? '#15803d' : '#6b7280', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 500, textTransform: 'capitalize' }}>
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
