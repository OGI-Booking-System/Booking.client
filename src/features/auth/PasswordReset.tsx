import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useSearchParams } from 'react-router-dom';
import { authAPI } from '../../api/authAPI';
import { forgotPasswordSchema, resetPasswordSchema, type ForgotPasswordFormData, type ResetPasswordFormData } from '../../lib/validators';
import { ROUTES } from '../../config/app.constants';
import AuthForm from '../../components/AuthForm';
import ErrorAlert from '../../components/ErrorAlert';
import SuccessAlert from '../../components/SuccessAlert';
import LoadingSpinner from '../../components/LoadingSpinner';

function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authAPI.forgotPassword(data);
      setSubmitted(true);
    } catch {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <AuthForm title="Check Your Email" onSubmit={(e) => e.preventDefault()} footer={<Link to={ROUTES.LOGIN} style={{ color: '#6366f1' }}>Back to Login</Link>}>
        <SuccessAlert message="If that email exists, you'll receive a password reset link shortly." />
      </AuthForm>
    );
  }

  return (
    <AuthForm title="Forgot Password" subtitle="Enter your email to reset" onSubmit={handleSubmit(onSubmit)} footer={<Link to={ROUTES.LOGIN} style={{ color: '#6366f1' }}>Back to Login</Link>}>
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Email *</label>
        <input type="email" placeholder="you@example.com" {...register('email')} style={inputStyle(!!errors.email)} />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>
      <button type="submit" disabled={isLoading} style={submitStyle}>
        {isLoading ? <LoadingSpinner size="sm" /> : 'Send Reset Link'}
      </button>
    </AuthForm>
  );
}

function ResetPasswordForm({ token }: { token: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authAPI.resetPassword({ token, password: data.password });
      setSubmitted(true);
    } catch {
      setError('Failed to reset password. The link may have expired.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <AuthForm title="Password Reset" onSubmit={(e) => e.preventDefault()} footer={<Link to={ROUTES.LOGIN} style={{ color: '#6366f1' }}>Back to Login</Link>}>
        <SuccessAlert message="Your password has been reset successfully!" />
      </AuthForm>
    );
  }

  return (
    <AuthForm title="Reset Password" subtitle="Enter your new password" onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>New Password *</label>
        <input type="password" placeholder="Min. 8 characters" {...register('password')} style={inputStyle(!!errors.password)} />
        {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Confirm Password *</label>
        <input type="password" placeholder="Repeat password" {...register('confirmPassword')} style={inputStyle(!!errors.confirmPassword)} />
        {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword.message}</p>}
      </div>
      <button type="submit" disabled={isLoading} style={submitStyle}>
        {isLoading ? <LoadingSpinner size="sm" /> : 'Reset Password'}
      </button>
    </AuthForm>
  );
}

export default function PasswordReset() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (token) {
    return <ResetPasswordForm token={token} />;
  }
  return <ForgotPasswordForm />;
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 };
const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: '100%', padding: '10px 12px', border: `1px solid ${hasError ? '#f87171' : '#d1d5db'}`,
  borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box',
});
const errorStyle: React.CSSProperties = { color: '#ef4444', fontSize: 12, margin: '4px 0 0' };
const submitStyle: React.CSSProperties = {
  width: '100%', padding: '11px', background: '#6366f1', color: '#fff', border: 'none',
  borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex',
  alignItems: 'center', justifyContent: 'center', gap: 8,
};
