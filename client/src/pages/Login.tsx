import React, { useState, FormEvent } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Dummy auth logic
    if (email === "admin" && password === "password") {
      alert("Login successful!");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img
          src="/login_photo.jpg"
          alt="Login Visual"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-12">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
