import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store';
import { logoutUser } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config/app.constants';
import Avatar from '../../../components/Avatar';
import SuccessAlert from '../../../components/SuccessAlert';
import { formatDate } from '../../../lib/formatters';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [saved, setSaved] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate(ROUTES.LOGIN);
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ margin: '0 0 24px', fontSize: 24, fontWeight: 700, color: '#111827' }}>Profile ⚙️</h1>

      {saved && <SuccessAlert message="Profile updated successfully!" onClose={() => setSaved(false)} />}

      <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e5e7eb', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f3f4f6' }}>
          <Avatar firstName={user.firstName} lastName={user.lastName} size={64} />
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{user.firstName} {user.lastName}</h2>
            <p style={{ margin: '2px 0 0', color: '#6b7280', fontSize: 14 }}>{user.email}</p>
            <span style={{ display: 'inline-block', marginTop: 4, background: '#ede9fe', color: '#6366f1', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 500, textTransform: 'capitalize' }}>
              {user.role}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {[
            ['First Name', user.firstName],
            ['Last Name', user.lastName],
            ['Email', user.email],
            ['Member Since', formatDate(user.createdAt)],
            ['Email Verified', user.isEmailVerified ? '✅ Verified' : '❌ Not verified'],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f9fafb' }}>
              <span style={{ fontSize: 14, color: '#6b7280' }}>{label}</span>
              <span style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Account Actions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={handleLogout} style={{ padding: '10px 16px', background: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500, textAlign: 'left' }}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
