import { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { API_ENDPOINTS } from '../../../config/api.config';
import type { User } from '../../../types/auth.types';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorAlert from '../../../components/ErrorAlert';
import Avatar from '../../../components/Avatar';
import { formatDate, capitalizeFirst } from '../../../lib/formatters';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance
      .get<{ data: User[] }>(API_ENDPOINTS.users.list)
      .then((res) => setUsers(res.data.data))
      .catch(() => setError('Failed to load users'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axiosInstance.delete(API_ENDPOINTS.users.delete(userId));
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch {
      setError('Failed to delete user');
    }
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#111827' }}>User Management 👥</h1>
      <p style={{ margin: '0 0 24px', color: '#6b7280' }}>View and manage registered users</p>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      {!isLoading && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                {['User', 'Email', 'Role', 'Verified', 'Joined', 'Actions'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#374151' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar firstName={u.firstName} lastName={u.lastName} size={32} />
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{u.firstName} {u.lastName}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 14, color: '#6b7280' }}>{u.email}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: u.role === 'admin' ? '#ede9fe' : '#dbeafe', color: u.role === 'admin' ? '#6366f1' : '#1d4ed8', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 500 }}>
                      {capitalizeFirst(u.role)}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>{u.isEmailVerified ? '✅' : '❌'}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{formatDate(u.createdAt)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={() => handleDelete(u.id)} style={{ padding: '4px 12px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: 32, textAlign: 'center', color: '#9ca3af' }}>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
