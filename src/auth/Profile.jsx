import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400">
        <span className="text-lg animate-pulse">Loading profile…</span>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 px-4">
      <div className="mx-auto max-w-4xl">

        {/* Header Card */}
        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">

            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-400 shadow-lg shrink-0">
              <img
                src={user?.picture || ""}
                alt={user?.name || "User"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='110' viewBox='0 0 110 110'%3E%3Ccircle cx='55' cy='55' r='55' fill='%236366f1'/%3E%3Cpath d='M55 50c8.28 0 15-6.72 15-15s-6.72-15-15-15-15 6.72-15 15 6.72 15 15 15zm0 7.5c-10 0-30 5.02-30 15v3.75c0 2.07 1.68 3.75 3.75 3.75h52.5c2.07 0 3.75-1.68 3.75-3.75V72.5c0-9.98-20-15-30-15z' fill='%23fff'/%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white">
                {user?.name}
              </h1>
              <p className="text-zinc-400 mt-1">{user?.email}</p>

              <div className="mt-3 inline-flex items-center gap-2 text-xs text-zinc-400 bg-zinc-800/60 px-3 py-1 rounded-full border border-zinc-700">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                Active Member
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Projects" value="—" />
          <StatCard label="Teams" value="—" />
          <StatCard label="Contributions" value="—" />
          <StatCard label="Achievements" value="—" />
        </div>

        {/* About / Placeholder */}
        <div className="mt-8 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            About
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            This is your HackFLOW profile. Soon you’ll be able to showcase your
            projects, skills, team collaborations, and achievements here.
          </p>
        </div>
      </div>
    </main>
  );
}

/* ---------- Components ---------- */

function StatCard({ label, value }) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-center hover:bg-zinc-900 transition">
      <p className="text-zinc-400 text-xs uppercase tracking-wide">
        {label}
      </p>
      <p className="text-white text-xl font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}
