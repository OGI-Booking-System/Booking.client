import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import type { AppDispatch, RootState } from '../../redux/store';
import { loginUser, clearError } from '../../redux/authSlice';
import { loginSchema, type LoginFormData } from '../../lib/validators';
import { ROUTES } from '../../config/app.constants';
import AuthForm from '../../components/AuthForm';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'admin' ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    await dispatch(loginUser(data));
  };

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to your account"
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <>
          Don't have an account?{' '}
          <Link to={ROUTES.REGISTER} style={{ color: '#6366f1', fontWeight: 500 }}>Register</Link>
          <br />
          <Link to={ROUTES.FORGOT_PASSWORD} style={{ color: '#6366f1' }}>Forgot password?</Link>
        </>
      }
    >
      {error && <ErrorAlert message={error} onClose={() => dispatch(clearError())} />}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Email *</label>
        <input type="email" placeholder="you@example.com" {...register('email')} style={inputStyle(!!errors.email)} />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Password *</label>
        <input type="password" placeholder="••••••••" {...register('password')} style={inputStyle(!!errors.password)} />
        {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={isLoading} style={submitStyle}>
        {isLoading ? <LoadingSpinner size="sm" /> : 'Sign In'}
      </button>
    </AuthForm>
  );
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
