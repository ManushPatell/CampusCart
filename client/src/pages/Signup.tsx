import React, { useState, FormEvent } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setShowPopup(true);
  };

  const verifyCode = () => {
    if (codeInput === "123456") {
      setShowPopup(false);
      setSuccessMessage("Email verified. Sign-up successful!");
      fetch("localhost:8000/users", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          password: password
        })          
      });
    } else {
      setError("Invalid verification code.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img
          src="/login_photo.jpg"
          alt="Login Visual"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Sign-Up Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSignUp}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            Sign Up
          </button>
        </form>
      </div>

      {/* Email Verification Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Confirm Your Email
            </h3>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter the 6-digit code sent to your email.
            </p>
            <input
              type="text"
              maxLength={6}
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-center tracking-widest text-lg"
            />
            <button
              onClick={verifyCode}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
