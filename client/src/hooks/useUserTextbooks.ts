import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Textbook } from "../types/types";

export default function useUserRentals() {
  const { user, isLoading: loading } = useAuth();
  const { data, isLoading, error } = useQuery<Textbook[]>({
    queryKey: ["userTextbooks", user?.id],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user!.id}/textbooks`,
      );
      return res.json();
    },

    enabled: !loading && !!user,
  });

  return {
    userTextbooks: data,
    isUserTextbooksLoading: isLoading,
    userTextbooksError: error,
  };
}
