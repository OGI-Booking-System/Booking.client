import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import type { RegisterPayload } from '../types/auth';

export function RegisterPage() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (values: RegisterPayload) => {
    setError(null);
    try {
      await register(values);
      navigate('/dashboard');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(message);
    }
  };

  return (
    <div
      className="page-wrapper"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="container">
        <div className="auth-card" style={{ maxWidth: 520 }}>
          <h1 className="auth-title">Create account 🎫</h1>
          <p className="auth-subtitle">Join EventPass to book and manage your event passes</p>
          <AuthForm
            mode="register"
            onSubmit={handleRegister as Parameters<typeof AuthForm>[0]['onSubmit']}
            isLoading={isLoading}
            error={error}
            footer={
              <p
                className="text-center mt-4"
                style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}
              >
                Already have an account?{' '}
                <Link to="/login" style={{ fontWeight: 600 }}>
                  Sign in
                </Link>
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
}
