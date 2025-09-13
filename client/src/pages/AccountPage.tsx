import { useAuth } from "../context/AuthContext";

export default function AccountPage() {
  const { user } = useAuth();

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
            {/* Add more fields as needed */}
          </div>
        </div>
      </section>
    </main>
  );
}