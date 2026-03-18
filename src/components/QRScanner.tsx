import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
}

const SCANNER_ID = 'qr-scanner-container';

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const startScanner = useCallback(async () => {
    if (scannerRef.current || scanning) return;
    try {
      const scanner = new Html5Qrcode(SCANNER_ID);
      scannerRef.current = scanner;
      setScanning(true);
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decoded) => {
          setLastResult(decoded);
          onScan(decoded);
        },
        undefined,
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Camera access denied or unavailable.';
      onError?.(message);
      setScanning(false);
      scannerRef.current = null;
    }
  }, [scanning, onScan, onError]);

  const stopScanner = useCallback(async () => {
    if (!scannerRef.current) return;
    try {
      await scannerRef.current.stop();
    } finally {
      scannerRef.current = null;
      setScanning(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      scannerRef.current?.stop().catch(() => null);
    };
  }, []);

  return (
    <div className="qr-scanner-wrapper">
      <div
        id={SCANNER_ID}
        className="qr-video-container"
        style={{ minHeight: scanning ? undefined : '200px' }}
        aria-live="polite"
      />
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {!scanning ? (
          <button className="btn btn-primary" onClick={startScanner}>
            📷 Start Scanner
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={stopScanner}>
            ⏹ Stop Scanner
          </button>
        )}
      </div>
      {lastResult && (
        <div className="qr-result">
          <strong>Scanned:</strong> {lastResult}
        </div>
      )}
    </div>
  );
}
