import { Loader } from '@/components/Loader/Loader';
import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props): ReactNode => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated && (location.pathname === '/signin' || location.pathname === '/signup')) {
    return <Navigate to='/chat' />;
  }

  return !isAuthenticated ? <Navigate to='/signin' replace /> : children;
};

export default ProtectedRoute;
