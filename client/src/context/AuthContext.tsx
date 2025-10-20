import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const refreshTokenInterval = 25 * 60 * 1000;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setEnabled(true), refreshTokenInterval);
    return () => clearTimeout(timer);
  }, []);

  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      return data.error ? null : data;
    },
  });
  const {
    data: refreshData,
    isLoading: isLoadingRefresh,
    error: refreshError,
  } = useQuery({
    queryKey: ["refreshToken"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      return data.error ? null : data;
    },
    enabled,
    refetchInterval: refreshTokenInterval,
    refetchIntervalInBackground: true,
  });

  return (
    <AuthContext.Provider
      value={{ user: data ?? null, isLoading: isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
