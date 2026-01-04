import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export default function Settings() {
  const { isAuthenticated, user } = useAuth0();

  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 px-4">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-zinc-400 mt-1">
            Manage your account preferences and platform behavior.
          </p>
        </div>

        {/* Settings Container */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-8 space-y-6">

          {/* Account Info */}
          <Section title="Account Information">
            <InfoRow label="Name" value={user?.name} />
            <InfoRow label="Email" value={user?.email} />
            <InfoRow label="Authentication" value="Auth0" />
          </Section>

          {/* Preferences */}
          <Section title="Preferences">
            <Toggle label="Email notifications" description="Get updates about activity and mentions." />
            <Toggle label="Show online status" description="Allow others to see when you are active." />
          </Section>

          {/* Appearance (placeholder) */}
          <Section title="Appearance">
            <div className="text-zinc-400 text-sm">
              Theme customization and UI preferences will be available soon.
            </div>
          </Section>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <button
              className="bg-indigo-500/90 hover:bg-indigo-500 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-200"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

/* ---------- Components ---------- */

function Section({ title, children }) {
  return (
    <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5 space-y-3">
      <h2 className="text-white font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-zinc-400">{label}</span>
      <span className="text-white">{value || "—"}</span>
    </div>
  );
}

function Toggle({ label, description }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        className="mt-1 accent-indigo-400"
      />
      <div>
        <p className="text-zinc-300 text-sm">{label}</p>
        <p className="text-zinc-500 text-xs">{description}</p>
      </div>
    </label>
  );
}
