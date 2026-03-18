import { APP_NAME } from '../config/app.constants';

export default function Footer() {
  return (
    <footer style={{
      background: '#1f2937',
      color: '#9ca3af',
      padding: '24px',
      textAlign: 'center',
      fontSize: 14,
      marginTop: 'auto',
    }}>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
      <p style={{ margin: '4px 0 0', fontSize: 12 }}>Event Pass Booking &amp; QR Verification System</p>
    </footer>
  );
}
