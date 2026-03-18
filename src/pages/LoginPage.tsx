import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: { email: string; password: string }) => {
    setError(null);
    try {
      await login(values);
      navigate('/dashboard');
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Login failed. Please check your credentials and try again.';
      setError(message);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container">
        <div className="auth-card">
          <h1 className="auth-title">Welcome back 👋</h1>
          <p className="auth-subtitle">Sign in to manage your event passes</p>
          <AuthForm
            mode="login"
            onSubmit={handleLogin as Parameters<typeof AuthForm>[0]['onSubmit']}
            isLoading={isLoading}
            error={error}
            footer={
              <p className="text-center mt-4" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ fontWeight: 600 }}>
                  Sign up
                </Link>
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
}
