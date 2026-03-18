import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/api';
import type { AuthResponse, LoginPayload, RegisterPayload, RefreshTokenResponse } from '../types/auth';
import type { User, UpdateProfilePayload } from '../types/user';

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH_REGISTER, payload);
    return data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH_LOGIN, payload);
    return data;
  },

  async logout(refreshToken: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH_LOGOUT, { refreshToken });
  },

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const { data } = await apiClient.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH_REFRESH_TOKEN,
      { refreshToken },
    );
    return data;
  },

  async verifyEmail(token: string): Promise<{ message: string }> {
    const { data } = await apiClient.get<{ message: string }>(
      `${API_ENDPOINTS.AUTH_VERIFY_EMAIL}?token=${token}`,
    );
    return data;
  },

  async getMe(): Promise<User> {
    const { data } = await apiClient.get<User>(API_ENDPOINTS.AUTH_ME);
    return data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<User> {
    const { data } = await apiClient.put<User>(API_ENDPOINTS.UPDATE_PROFILE, payload);
    return data;
  },
};
