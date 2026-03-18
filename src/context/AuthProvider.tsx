import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import type { User } from '../types/user';
import type { LoginPayload, RegisterPayload } from '../types/auth';
import { authService } from '../services/authService';
import { storage } from '../utils/storage';
import { SESSION_EXPIRED_EVENT } from '../services/apiClient';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => storage.getUser<User>());
  const [accessToken, setAccessToken] = useState<string | null>(() => storage.getAccessToken());
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Listen for session-expired event from the axios interceptor
  useEffect(() => {
    const handleExpired = () => {
      setUser(null);
      setAccessToken(null);
      navigate('/login', { replace: true });
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, handleExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleExpired);
  }, [navigate]);

  // Restore session on mount
  useEffect(() => {
    const token = storage.getAccessToken();
    if (token && !user) {
      setIsLoading(true);
      authService
        .getMe()
        .then((u) => {
          setUser(u);
          storage.setUser(u);
        })
        .catch(() => {
          storage.clearAuth();
          setUser(null);
          setAccessToken(null);
        })
        .finally(() => setIsLoading(false));
    }
    // Only run on mount to restore session from stored token
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const resp = await authService.login(payload);
      storage.setAccessToken(resp.accessToken);
      storage.setRefreshToken(resp.refreshToken);
      storage.setUser(resp.user);
      setAccessToken(resp.accessToken);
      setUser(resp.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const resp = await authService.register(payload);
      storage.setAccessToken(resp.accessToken);
      storage.setRefreshToken(resp.refreshToken);
      storage.setUser(resp.user);
      setAccessToken(resp.accessToken);
      setUser(resp.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    const refreshToken = storage.getRefreshToken();
    if (refreshToken) {
      authService.logout(refreshToken).catch(() => null);
    }
    storage.clearAuth();
    setUser(null);
    setAccessToken(null);
  }, []);

  const refreshAuth = useCallback(async (): Promise<boolean> => {
    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) return false;
    try {
      const resp = await authService.refreshToken(refreshToken);
      storage.setAccessToken(resp.accessToken);
      storage.setRefreshToken(resp.refreshToken);
      setAccessToken(resp.accessToken);
      return true;
    } catch {
      storage.clearAuth();
      setUser(null);
      setAccessToken(null);
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user && !!accessToken,
        isLoading,
        login,
        register,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
