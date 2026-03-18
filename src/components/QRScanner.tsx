import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
}

export default function QRScanner({ onScan, onError }: QRScannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startScanner = async () => {
    if (!containerRef.current) return;
    const id = 'qr-scanner-container';
    containerRef.current.id = id;
    const scanner = new Html5Qrcode(id);
    scannerRef.current = scanner;

    try {
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          onScan(decodedText);
          void stopScanner();
        },
        undefined,
      );
      setIsScanning(true);
      setError(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to start scanner';
      setError(msg);
      onError?.(msg);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
      } catch {
        // ignore
      }
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => undefined);
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: 320,
          minHeight: 280,
          border: '2px dashed #6366f1',
          borderRadius: 12,
          overflow: 'hidden',
          background: '#f9fafb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!isScanning && !error && (
          <p style={{ color: '#9ca3af', fontSize: 14 }}>Camera preview will appear here</p>
        )}
      </div>
      {error && <p style={{ color: '#b91c1c', fontSize: 13 }}>⚠️ {error}</p>}
      <button
        onClick={isScanning ? stopScanner : startScanner}
        style={{
          padding: '10px 24px',
          background: isScanning ? '#ef4444' : '#6366f1',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {isScanning ? '⏹ Stop Scanner' : '📷 Start Scanner'}
      </button>
    </div>
  );
}
