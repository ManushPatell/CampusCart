import { useAuth } from "@/context/AuthContext";
import { LoaderCircle } from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user, isLoading: loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <LoaderCircle className="animate-spin" /> Loading...
      </div>
    );
  }

  if (!loading && !user) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return <Outlet />;
};
