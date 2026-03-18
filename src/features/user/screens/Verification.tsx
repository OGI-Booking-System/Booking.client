import { useState } from 'react';
import { verificationAPI } from '../../../api/verificationAPI';
import type { QRVerificationResult } from '../../../types/qr.types';
import QRScanner from '../../../components/QRScanner';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default function Verification() {
  const [result, setResult] = useState<QRVerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState('');

  const verifyCode = async (qrData: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await verificationAPI.verifyQR({ qrData });
      setResult(response.data.data);
    } catch {
      setError('Failed to verify QR code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const statusConfig: Record<string, { bg: string; text: string; icon: string }> = {
    valid: { bg: '#dcfce7', text: '#15803d', icon: '✅' },
    invalid: { bg: '#fee2e2', text: '#b91c1c', icon: '❌' },
    used: { bg: '#fef9c3', text: '#854d0e', icon: '⚠️' },
    expired: { bg: '#f3f4f6', text: '#6b7280', icon: '⏰' },
  };

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#111827' }}>Verify Pass 📷</h1>
      <p style={{ margin: '0 0 24px', color: '#6b7280' }}>Scan a QR code or enter it manually to verify a pass</p>

      <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e5e7eb', marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>📷 Scan QR Code</h3>
        <QRScanner onScan={verifyCode} onError={setError} />
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e5e7eb', marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>⌨️ Manual Entry</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="Enter QR code data..."
            style={{ flex: 1, padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14 }}
          />
          <button
            onClick={() => manualInput && verifyCode(manualInput)}
            disabled={!manualInput || isLoading}
            style={{ padding: '10px 16px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}
          >
            Verify
          </button>
        </div>
      </div>

      {isLoading && <div style={{ textAlign: 'center', padding: 20 }}><LoadingSpinner /></div>}
      {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: 16, borderRadius: 8, marginBottom: 16 }}>⚠️ {error}</div>}

      {result && (
        <div style={{ background: statusConfig[result.status]?.bg ?? '#f3f4f6', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>{statusConfig[result.status]?.icon}</span>
            <div>
              <h3 style={{ margin: 0, color: statusConfig[result.status]?.text, textTransform: 'capitalize' }}>{result.status}</h3>
              <p style={{ margin: 0, fontSize: 14, color: statusConfig[result.status]?.text }}>{result.message}</p>
            </div>
          </div>
          {result.booking && (
            <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: 12, fontSize: 14 }}>
              <p style={{ margin: '0 0 4px' }}><strong>Event:</strong> {result.booking.eventTitle}</p>
              <p style={{ margin: '0 0 4px' }}><strong>Date:</strong> {result.booking.eventDate}</p>
              <p style={{ margin: 0 }}><strong>Holder:</strong> {result.booking.holderName}</p>
            </div>
          )}
          <button onClick={() => setResult(null)} style={{ marginTop: 12, background: 'none', border: '1px solid #d1d5db', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontSize: 13 }}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
