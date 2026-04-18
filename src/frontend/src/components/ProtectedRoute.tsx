import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types";
import { Navigate } from "@tanstack/react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div
        className="flex h-full items-center justify-center p-8"
        data-ocid="auth.loading_state"
      >
        <div className="space-y-3 w-full max-w-sm">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/notices" />;
  }

  return <>{children}</>;
}
