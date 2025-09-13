import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function AccountPage() {
  const { user } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [wishlist, setWishlist] = useState<string[]>(user?.wishlist ?? []);

  // Dummy handler for password change (replace with real logic)
  function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    // Add your password change logic here
    setShowPasswordForm(false);
    setCurrentPassword("");
    setNewPassword("");
    alert("Password changed (demo only)");
  }

  return (
    <main className="min-h-screen bg-bg text-primary-fg">
      <section className="max-w-3xl mx-auto px-6 pt-12">
        <div className="bg-[#F5F1EA] border border-[#E8DFD0] rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold text-[#4A4032] mb-4">
            Account Information
          </h1>
          <div className="flex flex-col gap-6">
            <div>
              <span className="block text-sm font-semibold text-[#4A4032]">Name</span>
              <span className="block text-lg">{user?.name ?? "N/A"}</span>
            </div>
            <div>
              <span className="block text-sm font-semibold text-[#4A4032]">Email</span>
              <span className="block text-lg">{user?.email ?? "N/A"}</span>
            </div>
            <div>
              <span className="block text-sm font-semibold text-[#4A4032]">Phone Number</span>
              <span className="block text-lg">{user?.phone ?? "N/A"}</span>
            </div>
            {/* Smaller Change Password Button under Phone Number */}
            {!showPasswordForm && (
              <button
                className="mt-2 px-3 py-1 text-sm bg-fuchsia-500 text-white rounded hover:bg-fuchsia-600 transition self-start"
                onClick={() => setShowPasswordForm(true)}
              >
                Change Password
              </button>
            )}
          </div>
          {/* Change Password Section */}
          {showPasswordForm && (
            <div className="mt-4">
              <h2 className="text-xl font-bold text-[#4A4032] mb-2">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="flex flex-col gap-4 mt-2">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="border rounded px-3 py-2"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-fuchsia-500 text-white rounded hover:bg-fuchsia-600 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-[#4A4032] rounded hover:bg-gray-400 transition"
                    onClick={() => setShowPasswordForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          {/* Wishlist Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-[#4A4032] mb-2">Wishlist</h2>
            {wishlist && wishlist.length > 0 ? (
              <ul className="list-disc pl-6">
                {wishlist.map((item, idx) => (
                  <li key={idx} className="text-lg">{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Your wishlist is empty.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}