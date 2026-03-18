import { type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingSpinner } from './LoadingSpinner';
import { getPasswordStrength } from '../utils/validators';

// ---------- Login ----------
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
type LoginValues = z.infer<typeof loginSchema>;

// ---------- Register ----------
const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must include an uppercase letter')
      .regex(/[a-z]/, 'Must include a lowercase letter')
      .regex(/[0-9]/, 'Must include a number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    role: z.enum(['attendee', 'organizer']),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
type RegisterValues = z.infer<typeof registerSchema>;

// ---------- Shared types ----------
interface BaseProps {
  onSubmit: (values: LoginValues | RegisterValues) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
  footer?: ReactNode;
}

interface LoginFormProps extends BaseProps {
  mode: 'login';
}
interface RegisterFormProps extends BaseProps {
  mode: 'register';
}
type AuthFormProps = LoginFormProps | RegisterFormProps;

export function AuthForm({ mode, onSubmit, isLoading, error, footer }: AuthFormProps) {
  if (mode === 'login') {
    return <LoginForm onSubmit={onSubmit as (v: LoginValues) => Promise<void>} isLoading={isLoading} error={error} footer={footer} />;
  }
  return <RegisterForm onSubmit={onSubmit as (v: RegisterValues) => Promise<void>} isLoading={isLoading} error={error} footer={footer} />;
}

// ---------- Login Form ----------
function LoginForm({
  onSubmit,
  isLoading,
  error,
  footer,
}: {
  onSubmit: (v: LoginValues) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
  footer?: ReactNode;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <div className="alert alert-error" role="alert">
          ⚠️ {error}
        </div>
      )}
      <div className="form-group">
        <label className="form-label" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={`form-input${errors.email ? ' error' : ''}`}
          {...register('email')}
        />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className={`form-input${errors.password ? ' error' : ''}`}
          {...register('password')}
        />
        {errors.password && <span className="form-error">{errors.password.message}</span>}
      </div>
      <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={isLoading}>
        {isLoading ? <LoadingSpinner size="sm" label="Signing in..." /> : 'Sign In'}
      </button>
      {footer}
    </form>
  );
}

// ---------- Register Form ----------
function RegisterForm({
  onSubmit,
  isLoading,
  error,
  footer,
}: {
  onSubmit: (v: RegisterValues) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
  footer?: ReactNode;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema), defaultValues: { role: 'attendee' } });

  const password = watch('password', '');
  const strength = getPasswordStrength(password);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <div className="alert alert-error" role="alert">
          ⚠️ {error}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            className={`form-input${errors.firstName ? ' error' : ''}`}
            {...register('firstName')}
          />
          {errors.firstName && <span className="form-error">{errors.firstName.message}</span>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            className={`form-input${errors.lastName ? ' error' : ''}`}
            {...register('lastName')}
          />
          {errors.lastName && <span className="form-error">{errors.lastName.message}</span>}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="reg-email">Email</label>
        <input
          id="reg-email"
          type="email"
          autoComplete="email"
          className={`form-input${errors.email ? ' error' : ''}`}
          {...register('email')}
        />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="reg-password">Password</label>
        <input
          id="reg-password"
          type="password"
          autoComplete="new-password"
          className={`form-input${errors.password ? ' error' : ''}`}
          {...register('password')}
        />
        {password && (
          <div
            className={`password-strength strength-${strength}`}
            title={`Password strength: ${strength}`}
          />
        )}
        {errors.password && <span className="form-error">{errors.password.message}</span>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          className={`form-input${errors.confirmPassword ? ' error' : ''}`}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span className="form-error">{errors.confirmPassword.message}</span>
        )}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="role">Role</label>
        <select id="role" className="form-input" {...register('role')}>
          <option value="attendee">Attendee</option>
          <option value="organizer">Organizer</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={isLoading}>
        {isLoading ? <LoadingSpinner size="sm" label="Creating account..." /> : 'Create Account'}
      </button>
      {footer}
    </form>
  );
}
