import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Rental } from "../types/types";

export default function useUserRentals() {
  const { user, loading } = useAuth();
  const { data, isLoading, error } = useQuery<Rental[]>({
    queryKey: ["userRentals", user?.id],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user!.id}/rentals`,
      );
      return res.json();
    },

    enabled: !loading && !!user,
  });

  return {
    userRentals: data,
    isUserRentalsLoading: isLoading,
    userRentalsError: error,
  };
}
