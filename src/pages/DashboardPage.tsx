import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProtected } from '../hooks/useProtected';
import { useBooking } from '../hooks/useBooking';
import { PassCard } from '../components/PassCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';
import { getInitials, formatDate } from '../utils/formatters';
import { ROLE_LABELS } from '../constants/roles';

export function DashboardPage() {
  useProtected();
  const { user } = useAuth();
  const { passes, isLoading, error, fetchMyPasses, cancelBooking } = useBooking();

  useEffect(() => {
    fetchMyPasses();
  }, [fetchMyPasses]);

  const activePasses = passes.filter((p) => p.status === 'active');
  const usedPasses = passes.filter((p) => p.status === 'used' || p.status === 'expired');

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Welcome Banner */}
        <div
          className="card"
          style={{
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
            color: '#fff',
            border: 'none',
          }}
        >
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {user ? getInitials(user.firstName, user.lastName) : '?'}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.25rem' }}>
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p style={{ opacity: 0.85, fontSize: '0.9rem' }}>
                {user ? ROLE_LABELS[user.role] : ''} · {user?.email}
              </p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Link to="/events" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                + Book Event
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{passes.length}</div>
            <div className="stat-label">Total Passes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{activePasses.length}</div>
            <div className="stat-label">Active Passes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{usedPasses.length}</div>
            <div className="stat-label">Used / Expired</div>
          </div>
          {user?.createdAt && (
            <div className="stat-card">
              <div className="stat-value" style={{ fontSize: '1.1rem' }}>
                {formatDate(user.createdAt, { month: 'short', year: 'numeric', day: 'numeric' })}
              </div>
              <div className="stat-label">Member Since</div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && <ErrorAlert message={error} />}

        {/* Loading */}
        {isLoading && <LoadingSpinner label="Loading your passes..." />}

        {/* Active Passes */}
        {!isLoading && (
          <>
            <h2 className="section-heading">Active Passes</h2>
            {activePasses.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🎟️</div>
                <p className="empty-state-text">No active passes.</p>
                <Link to="/events" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Browse Events
                </Link>
              </div>
            ) : (
              <div className="passes-grid" style={{ marginBottom: '2rem' }}>
                {activePasses.map((pass) => (
                  <PassCard key={pass.id} pass={pass} onCancel={cancelBooking} />
                ))}
              </div>
            )}

            {/* Past Passes */}
            {usedPasses.length > 0 && (
              <>
                <h2 className="section-heading">Past Passes</h2>
                <div className="passes-grid">
                  {usedPasses.map((pass) => (
                    <PassCard key={pass.id} pass={pass} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
