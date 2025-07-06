import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { loading: loadingAuth, user } = useAuth();

  if (loadingAuth) return <p>Loading...</p>;

  if (user === null) return <p>You are not currently logged in.</p>;

  const { id, firstName, lastName, email, phoneNumber } = user;
  return (
    <p>
      Id: {id}
      First Name: {firstName}
      Last Name: {lastName}
      email: {email}
      phoneNumber: {phoneNumber}
    </p>
  );
}
