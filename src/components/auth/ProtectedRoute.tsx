import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type ProtectedRouteProps = {
  requiredRole?: 'driver' | 'user';
};

export default function ProtectedRoute({ requiredRole = 'user' }: ProtectedRouteProps) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!currentUser) {
    // Redirect to the login page, but save the current location they were trying to go to
    return <Navigate to="/driver-login" state={{ from: location }} replace />;
  }

  // Check if the user has the required role
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
