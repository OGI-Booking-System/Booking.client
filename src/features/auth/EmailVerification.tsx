import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { authAPI } from '../../api/authAPI';
import { ROUTES } from '../../config/app.constants';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(token ? 'loading' : 'error');
  const [message, setMessage] = useState(token ? '' : 'Invalid verification link.');

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    authAPI.verifyEmail(token)
      .then(() => {
        if (!cancelled) {
          setStatus('success');
          setMessage('Your email has been verified successfully!');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('error');
          setMessage('Verification failed. The link may have expired.');
        }
      });
    return () => { cancelled = true; };
  }, [token]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#ede9fe,#dbeafe)', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 40, maxWidth: 400, width: '100%', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
        {status === 'loading' && (
          <>
            <LoadingSpinner size="lg" />
            <p style={{ marginTop: 16, color: '#6b7280' }}>Verifying your email...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div style={{ fontSize: 56 }}>✅</div>
            <h2 style={{ color: '#15803d', marginTop: 12 }}>Email Verified!</h2>
            <p style={{ color: '#6b7280' }}>{message}</p>
            <Link to={ROUTES.LOGIN} style={{ display: 'inline-block', marginTop: 16, padding: '10px 24px', background: '#6366f1', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
              Continue to Login
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <div style={{ fontSize: 56 }}>❌</div>
            <h2 style={{ color: '#b91c1c', marginTop: 12 }}>Verification Failed</h2>
            <p style={{ color: '#6b7280' }}>{message}</p>
            <Link to={ROUTES.LOGIN} style={{ display: 'inline-block', marginTop: 16, padding: '10px 24px', background: '#6366f1', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
