import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../redux/store';
import { fetchEvents } from '../../../redux/eventsSlice';
import type { Event } from '../../../types/event.types';
import { ROUTES } from '../../../config/app.constants';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { events, isLoading } = useSelector((state: RootState) => state.events);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    void dispatch(fetchEvents());
  }, [dispatch]);

  const stats = {
    total: events.length,
    upcoming: events.filter((e: Event) => e.status === 'upcoming').length,
    completed: events.filter((e: Event) => e.status === 'completed').length,
    cancelled: events.filter((e: Event) => e.status === 'cancelled').length,
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#111827' }}>
          Admin Dashboard 🛠️
        </h1>
        <p style={{ margin: '4px 0 0', color: '#6b7280' }}>Welcome back, {user?.firstName}. Here's an overview.</p>
      </div>

      {isLoading ? <LoadingSpinner /> : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Total Events', value: stats.total, icon: '🎪', color: '#6366f1', href: ROUTES.ADMIN.EVENTS },
              { label: 'Upcoming', value: stats.upcoming, icon: '📅', color: '#059669', href: ROUTES.ADMIN.EVENTS },
              { label: 'Completed', value: stats.completed, icon: '✅', color: '#d97706', href: ROUTES.ADMIN.EVENTS },
              { label: 'Cancelled', value: stats.cancelled, icon: '❌', color: '#ef4444', href: ROUTES.ADMIN.EVENTS },
            ].map((stat) => (
              <Link key={stat.label} to={stat.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{stat.label}</div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
            {[
              { label: '+ Create Event', href: ROUTES.ADMIN.EVENTS, bg: '#6366f1' },
              { label: '🔍 Verify Passes', href: ROUTES.ADMIN.PASS_VERIFICATION, bg: '#059669' },
              { label: '👥 Manage Users', href: ROUTES.ADMIN.USERS, bg: '#d97706' },
              { label: '📊 View Reports', href: ROUTES.ADMIN.REPORTS, bg: '#7c3aed' },
            ].map((action) => (
              <Link key={action.label} to={action.href} style={{ padding: '12px 20px', background: action.bg, color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 500, textAlign: 'center' }}>
                {action.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
