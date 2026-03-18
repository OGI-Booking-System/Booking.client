import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../config/api.config';
import type { QRVerificationResult, QRScanRequest } from '../types/qr.types';
import type { ApiResponse } from '../types/api.types';

export const verificationAPI = {
  verifyQR: (data: QRScanRequest) =>
    axiosInstance.post<ApiResponse<QRVerificationResult>>(API_ENDPOINTS.verification.verify, data),

  getVerificationHistory: () =>
    axiosInstance.get<ApiResponse<QRVerificationResult[]>>(API_ENDPOINTS.verification.history),
};
