import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [rentalsData, setRentalsData] = useState(null);

  useEffect(() => {
    if (loading || !user) return;

    fetch(`${import.meta.env.VITE_API_URL}/users/${user.id}/rentals`)
      .then((res) => res.json())
      .then((body) => setRentalsData(body));
  }, [loading, user]);

  if (loading) return <p>Loading...</p>;

  if (user === null) return <p>You are not currently logged in.</p>;

  console.log(rentalsData);
  // const { id, firstName, lastName, email, phoneNumber } = user;
  return (
    <div>
      <div>Rentals: {String(rentalsData)}</div>
    </div>
  );
}
