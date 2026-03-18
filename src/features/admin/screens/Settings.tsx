import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import { APP_NAME } from '../../../config/app.constants';
import env from '../../../config/environment';
import SuccessAlert from '../../../components/SuccessAlert';

export default function Settings() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#111827' }}>Settings ⚙️</h1>
      <p style={{ margin: '0 0 24px', color: '#6b7280' }}>System configuration and admin account settings</p>

      {saved && <SuccessAlert message="Settings saved successfully!" onClose={() => setSaved(false)} />}

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>System Information</h3>
        </div>
        <div style={{ padding: 24 }}>
          {[
            ['Application Name', APP_NAME],
            ['Environment', env.APP_ENV],
            ['API Base URL', env.API_BASE_URL],
            ['Admin Name', `${user?.firstName} ${user?.lastName}`],
            ['Admin Email', user?.email ?? ''],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
              <span style={{ fontSize: 14, color: '#6b7280' }}>{label}</span>
              <span style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>App Settings</h3>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Default Event Capacity</label>
            <input type="number" defaultValue={100} style={{ width: '100%', maxWidth: 160, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14 }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: 16, height: 16 }} />
              <span style={{ fontSize: 14 }}>Send email notifications for new bookings</span>
            </label>
          </div>
          <button onClick={handleSave} style={{ padding: '10px 24px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
