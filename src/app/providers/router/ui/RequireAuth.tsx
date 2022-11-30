import { useSelector } from 'react-redux';
import { getUserAuthData, getUserRoles, UserRole } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { RouterPath } from 'shared/config/routeConfig/routeConfig';
import { useMemo } from 'react';
import { use } from 'i18next';

interface RequireAuthProps {
  children: JSX.Element
  roles?: UserRole[]
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);
  console.log(userRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }

    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!auth || !hasRequiredRoles) {
    return <Navigate to={RouterPath.main} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return <Navigate to={RouterPath.forbidden_page} state={{ from: location }} replace />;
  }

  return children;
}
