import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/api';
import type { QRVerification, VerifyQRPayload } from '../types/qr';

export const verificationService = {
  async verifyQR(payload: VerifyQRPayload): Promise<QRVerification> {
    const { data } = await apiClient.post<QRVerification>(API_ENDPOINTS.VERIFY_QR, payload);
    return data;
  },

  async getVerificationHistory(): Promise<QRVerification[]> {
    const { data } = await apiClient.get<QRVerification[]>(API_ENDPOINTS.VERIFICATION_HISTORY);
    return data;
  },
};
