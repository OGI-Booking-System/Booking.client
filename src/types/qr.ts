import type { BookingPass } from './booking';

export type VerificationStatus = 'valid' | 'invalid' | 'used' | 'expired';

export interface QRVerification {
  isValid: boolean;
  status: VerificationStatus;
  pass?: BookingPass;
  message: string;
  verifiedAt: string;
}

export interface VerifyQRPayload {
  qrCode: string;
}
