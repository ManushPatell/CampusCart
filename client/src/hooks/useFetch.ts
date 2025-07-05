import { useEffect, useState } from "react";

// Custom fetching hook to handle error and loading states
// MAKE SURE options param is memoized before passed in
export default function useFetch<T>(url: string, options: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<{
    message: string;
    status: number;
    body: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);

      const res = await fetch(url, options);
      const body = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError({
          message: body.error,
          status: res.status,
          body: body,
        });
        return;
      }

      setData(body);
    };
    fetchData();
  }, [options, url, trigger]);

  const refetch = () => setTrigger((prev) => prev + 1);

  return { data, error, loading, refetch };
}
