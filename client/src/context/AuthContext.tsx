import { createContext, ReactNode, useContext, useMemo } from "react";
import useFetch from "../hooks/useFetch";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refetchUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const options: RequestInit = useMemo(
    () => ({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }),
    [],
  );
  const { data, loading, refetch } = useFetch<User>(
    `${import.meta.env.VITE_API_URL}/auth/me`,
    options,
  ); // The error field doesn't matter here

  return (
    <AuthContext.Provider value={{ user: data, loading, refetchUser: refetch }}>
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
