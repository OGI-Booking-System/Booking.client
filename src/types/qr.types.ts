export type QRVerificationStatus = 'valid' | 'invalid' | 'used' | 'expired';

export interface QRVerificationResult {
  status: QRVerificationStatus;
  message: string;
  booking?: {
    id: string;
    eventTitle: string;
    eventDate: string;
    holderName: string;
  };
}

export interface QRScanRequest {
  qrData: string;
}
