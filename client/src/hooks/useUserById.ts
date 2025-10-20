// src/hooks/useUserById.ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";

type ApiUser = {
  id: number | string;
  first_name?: string;
  last_name?: string;
  email?: string;
};

type UserOut = {
  id: number | string;
  name: string;
  email?: string;
};

export default function useUserById(
  userId?: number | string,
): UseQueryResult<UserOut, Error> {
  const base = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  return useQuery<ApiUser, Error, UserOut>({
    queryKey: ["userById", userId],
    enabled: !!userId,
    queryFn: async () => {
      const r = await fetch(`${base}/users/${userId}`, {
        credentials: "include",
      });
      if (!r.ok) throw new Error("Failed to load user");
      return (await r.json()) as ApiUser;
    },
    select: (u) => ({
      id: u.id,
      name: [u.first_name, u.last_name].filter(Boolean).join(" "),
      email: u.email,
    }),
  });
}
