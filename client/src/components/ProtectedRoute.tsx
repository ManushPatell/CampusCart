import { useAuth } from "@/context/AuthContext";
import { LoaderCircle } from "lucide-react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user, isLoading: loading } = useAuth();

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

  return <Outlet />;
};
