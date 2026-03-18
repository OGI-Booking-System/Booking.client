import { useState } from 'react';
import { useProtected } from '../hooks/useProtected';
import { verificationService } from '../services/verificationService';
import { QRScanner } from '../components/QRScanner';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';
import type { QRVerification } from '../types/qr';
import { formatDateTime } from '../utils/formatters';

export function QRVerificationPage() {
  useProtected(['admin', 'organizer']);
  const [result, setResult] = useState<QRVerification | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');

  const handleScan = async (qrCode: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await verificationService.verifyQR({ qrCode });
      setResult(data);
    } catch {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleScan(manualCode.trim());
    }
  };

  const statusConfig: Record<string, { icon: string; className: string }> = {
    valid: { icon: '✅', className: 'alert-success' },
    invalid: { icon: '❌', className: 'alert-error' },
    used: { icon: '⚠️', className: 'alert-warning' },
    expired: { icon: '⏰', className: 'alert-warning' },
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: 700 }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>QR Verification 🔍</h1>
          <p className="text-muted">Scan or enter a QR code to verify an event pass.</p>
        </div>

        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Scan QR Code</h2>
          </div>
          <div className="card-body">
            <QRScanner onScan={handleScan} onError={setError} />
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Enter Code Manually</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleManualSubmit} style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                style={{ flex: 1 }}
                placeholder="Paste QR code value here..."
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                aria-label="Manual QR code input"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!manualCode.trim() || isLoading}
              >
                Verify
              </button>
            </form>
          </div>
        </div>

        {isLoading && <LoadingSpinner label="Verifying pass..." />}

        {result && !isLoading && (
          <div className="card">
            <div className="card-header">
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Verification Result</h2>
            </div>
            <div className="card-body">
              <div className={`alert ${statusConfig[result.status]?.className || 'alert-info'}`}>
                <span style={{ fontSize: '1.25rem' }}>
                  {statusConfig[result.status]?.icon || 'ℹ️'}
                </span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                    {result.status.toUpperCase()} – {result.message}
                  </strong>
                  <small>Verified at {formatDateTime(result.verifiedAt)}</small>
                </div>
              </div>
              {result.pass && (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <tbody>
                    {[
                      ['Event', result.pass.event.title],
                      ['Location', result.pass.event.location],
                      ['Date', result.pass.event.date ? formatDateTime(result.pass.event.date) : '—'],
                      ['Pass ID', result.pass.id],
                      ['Status', result.pass.status],
                    ].map(([label, value]) => (
                      <tr key={label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td
                          style={{
                            padding: '0.625rem 0.5rem',
                            fontWeight: 600,
                            color: 'var(--color-text-muted)',
                            width: '35%',
                          }}
                        >
                          {label}
                        </td>
                        <td style={{ padding: '0.625rem 0.5rem' }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
