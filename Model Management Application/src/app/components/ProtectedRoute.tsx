import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: 'manager' | 'model';
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    // Redirect to appropriate dashboard if role doesn't match
    const redirectPath = user?.role === 'manager' ? '/manager/dashboard' : '/model/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
