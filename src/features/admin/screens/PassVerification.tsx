import { useState } from 'react';
import { verificationAPI } from '../../../api/verificationAPI';
import type { QRVerificationResult } from '../../../types/qr.types';
import QRScanner from '../../../components/QRScanner';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { formatDateTime } from '../../../lib/formatters';

interface VerificationHistoryItem extends QRVerificationResult {
  timestamp: string;
  qrData: string;
}

export default function PassVerification() {
  const [result, setResult] = useState<QRVerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [history, setHistory] = useState<VerificationHistoryItem[]>([]);

  const verifyCode = async (qrData: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await verificationAPI.verifyQR({ qrData });
      const verificationResult = response.data.data;
      setResult(verificationResult);
      setHistory((prev) => [{ ...verificationResult, timestamp: new Date().toISOString(), qrData }, ...prev.slice(0, 9)]);
    } catch {
      setError('Failed to verify QR code.');
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
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#111827' }}>Pass Verification 🔍</h1>
      <p style={{ margin: '0 0 24px', color: '#6b7280' }}>Scan or enter QR codes to verify attendee passes</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>📷 Scan QR Code</h3>
          <QRScanner onScan={verifyCode} onError={setError} />
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>⌨️ Manual Entry</h3>
          <textarea
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="Paste QR code data here..."
            rows={4}
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', marginBottom: 12, resize: 'vertical' }}
          />
          <button
            onClick={() => manualInput && verifyCode(manualInput)}
            disabled={!manualInput || isLoading}
            style={{ width: '100%', padding: '10px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
          >
            {isLoading ? <LoadingSpinner size="sm" /> : 'Verify Pass'}
          </button>

          {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: 12, borderRadius: 8, marginTop: 12, fontSize: 13 }}>⚠️ {error}</div>}

          {result && (
            <div style={{ background: statusConfig[result.status]?.bg ?? '#f3f4f6', borderRadius: 8, padding: 16, marginTop: 12 }}>
              <p style={{ margin: 0, fontWeight: 700, color: statusConfig[result.status]?.text, fontSize: 18 }}>
                {statusConfig[result.status]?.icon} {result.status.toUpperCase()}
              </p>
              <p style={{ margin: '4px 0 0', color: statusConfig[result.status]?.text, fontSize: 13 }}>{result.message}</p>
              {result.booking && (
                <div style={{ marginTop: 8, fontSize: 13 }}>
                  <p style={{ margin: '2px 0' }}><strong>Event:</strong> {result.booking.eventTitle}</p>
                  <p style={{ margin: '2px 0' }}><strong>Holder:</strong> {result.booking.holderName}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {history.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>Recent Verifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {history.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: statusConfig[item.status]?.bg ?? '#f3f4f6', borderRadius: 8 }}>
                <span style={{ color: statusConfig[item.status]?.text, fontWeight: 600, fontSize: 13 }}>
                  {statusConfig[item.status]?.icon} {item.status.toUpperCase()}
                  {item.booking && ` — ${item.booking.holderName}`}
                </span>
                <span style={{ fontSize: 12, color: '#6b7280' }}>{formatDateTime(item.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
