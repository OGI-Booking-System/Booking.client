import type { ReactNode } from 'react';
import type { UseFormRegister, FieldError } from 'react-hook-form';

interface AuthFormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<Record<string, string>>;
  error?: FieldError;
  required?: boolean;
}

export function AuthFormField({ label, name, type = 'text', placeholder, register, error, required }: AuthFormFieldProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 }}>
        {label}{required && <span style={{ color: '#ef4444' }}> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name as never)}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: `1px solid ${error ? '#f87171' : '#d1d5db'}`,
          borderRadius: 8,
          fontSize: 14,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s',
        }}
      />
      {error && <p style={{ color: '#ef4444', fontSize: 12, margin: '4px 0 0' }}>{error.message}</p>}
    </div>
  );
}

interface AuthFormProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  footer?: ReactNode;
}

export default function AuthForm({ title, subtitle, children, onSubmit, footer }: AuthFormProps) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg,#ede9fe,#dbeafe)',
      padding: 16,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: 32,
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🎫</div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#111827' }}>{title}</h1>
          {subtitle && <p style={{ margin: '4px 0 0', fontSize: 14, color: '#6b7280' }}>{subtitle}</p>}
        </div>
        <form onSubmit={onSubmit}>{children}</form>
        {footer && <div style={{ marginTop: 16, textAlign: 'center', fontSize: 14, color: '#6b7280' }}>{footer}</div>}
      </div>
    </div>
  );
}
