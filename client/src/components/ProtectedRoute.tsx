import { useAuth } from "@/context/AuthContext";
import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <LoaderCircle className="animate-spin" /> Loading...
      </div>
    );
  }

  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
