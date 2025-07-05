import { useMemo } from "react";
import useFetch from "../hooks/useFetch";

export default function Dashboard() {
  const options: RequestInit = useMemo(
    () => ({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }),
    [],
  );
  const { data, error, loading } = useFetch<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
  }>(`${import.meta.env.VITE_API_URL}/auth/me`, options);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Status: {error.status}, Error msg: {error.message}
      </p>
    );

  return (
    <p>
      {data?.id}
      {data?.firstName}
      {data?.lastName}
      {data?.email}
      {data?.phoneNumber}
    </p>
  );
}
