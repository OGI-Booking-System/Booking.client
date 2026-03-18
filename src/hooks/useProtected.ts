import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import type { UserRole } from '../types/user';

export function useProtected(allowedRoles?: UserRole[]): void {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, navigate]);
}
