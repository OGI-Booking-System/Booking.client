import { useState } from 'react';
import { useProtected } from '../hooks/useProtected';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { storage } from '../utils/storage';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';
import { SuccessAlert } from '../components/SuccessAlert';
import { getInitials } from '../utils/formatters';
import { ROLE_LABELS } from '../constants/roles';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});
type ProfileValues = z.infer<typeof profileSchema>;

export function ProfilePage() {
  useProtected();
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
    },
  });

  const onSubmit = async (values: ProfileValues) => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    try {
      const updated = await authService.updateProfile(values);
      storage.setUser(updated);
      setSuccess('Profile updated successfully!');
    } catch {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return <LoadingSpinner label="Loading profile..." />;

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: 640 }}>
        {/* Profile Header */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div
            className="card-body"
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'var(--color-primary)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {getInitials(user.firstName, user.lastName)}
            </div>
            <div>
              <h1 style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                {user.email}
              </p>
              <p style={{ marginTop: '0.25rem', fontSize: '0.82rem' }}>
                <span
                  style={{
                    background: 'var(--color-surface-alt)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '999px',
                    padding: '0.1rem 0.6rem',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                  }}
                >
                  {ROLE_LABELS[user.role]}
                </span>
                {user.isEmailVerified && (
                  <span style={{ marginLeft: '0.5rem', color: 'var(--color-success)', fontSize: '0.82rem' }}>
                    ✔ Verified
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Edit Profile</h2>
          </div>
          <div className="card-body">
            {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
            {success && <SuccessAlert message={success} onClose={() => setSuccess(null)} />}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className={`form-input${errors.firstName ? ' error' : ''}`}
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <span className="form-error">{errors.firstName.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    className={`form-input${errors.lastName ? ' error' : ''}`}
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <span className="form-error">{errors.lastName.message}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className={`form-input${errors.email ? ' error' : ''}`}
                  {...register('email')}
                />
                {errors.email && <span className="form-error">{errors.email.message}</span>}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isDirty || isLoading}
              >
                {isLoading ? <LoadingSpinner size="sm" label="Saving..." /> : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card">
          <div className="card-header">
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-error)' }}>
              Account Actions
            </h2>
          </div>
          <div className="card-body">
            <button className="btn btn-danger" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
