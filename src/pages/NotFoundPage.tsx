import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div
      className="page-wrapper"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="container text-center">
        <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🎫</div>
        <h1 style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
        <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1rem' }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            Go Home
          </Link>
          <Link to="/dashboard" className="btn btn-secondary btn-lg">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
