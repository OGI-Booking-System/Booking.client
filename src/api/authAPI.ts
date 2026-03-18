import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from '../config/api.config';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../types/auth.types';
import type { ApiResponse } from '../types/api.types';
import type { User } from '../types/auth.types';

export const authAPI = {
  login: (data: LoginRequest) =>
    axiosInstance.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.auth.login, data),

  register: (data: RegisterRequest) =>
    axiosInstance.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.auth.register, data),

  logout: (refreshToken: string) =>
    axiosInstance.post<ApiResponse<null>>(API_ENDPOINTS.auth.logout, { refreshToken }),

  refreshToken: (data: RefreshTokenRequest) =>
    axiosInstance.post<ApiResponse<{ accessToken: string }>>(API_ENDPOINTS.auth.refresh, data),

  verifyEmail: (token: string) =>
    axiosInstance.get<ApiResponse<null>>(`${API_ENDPOINTS.auth.verifyEmail}?token=${token}`),

  forgotPassword: (data: ForgotPasswordRequest) =>
    axiosInstance.post<ApiResponse<null>>(API_ENDPOINTS.auth.forgotPassword, data),

  resetPassword: (data: ResetPasswordRequest) =>
    axiosInstance.post<ApiResponse<null>>(API_ENDPOINTS.auth.resetPassword, data),

  getMe: () =>
    axiosInstance.get<ApiResponse<User>>(API_ENDPOINTS.auth.me),
};
