import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { ReactNode } from 'react';
import type { RootState } from '../redux/store';
import type { UserRole } from '../types/auth.types';
import { ROUTES } from '../config/app.constants';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    const redirect = user?.role === 'admin' ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.DASHBOARD;
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
}
