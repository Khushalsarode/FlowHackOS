import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Settings() {
  const { isAuthenticated, user } = useAuth0();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    showOnlineStatus: true,
    darkMode: true,
    autoSave: false,
    connectedGitHub: true,
    connectedGoogle: false,
  });

  if (!isAuthenticated) return <Navigate to="/" />;

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 px-4">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-zinc-400 mt-1">
            Manage your account, preferences, and connected services.
          </p>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-8 space-y-6">

          {/* Account Info */}
          <Section title="Account Information">
            <InfoRow label="Name" value={user?.name} />
            <InfoRow label="Email" value={user?.email} />
            <InfoRow label="Auth Provider" value="Auth0" />
            <InfoRow label="Member Since" value="Jan 2024" />
            <InfoRow label="Role" value="Builder" />
          </Section>

          {/* Preferences */}
          <Section title="Preferences">
            <Toggle
              label="Email notifications"
              description="Get updates about activity and mentions."
              checked={settings.emailNotifications}
              onChange={() => toggleSetting("emailNotifications")}
            />
            <Toggle
              label="Show online status"
              description="Allow others to see when you are active."
              checked={settings.showOnlineStatus}
              onChange={() => toggleSetting("showOnlineStatus")}
            />
            <Toggle
              label="Dark mode"
              description="Use dark theme across the platform."
              checked={settings.darkMode}
              onChange={() => toggleSetting("darkMode")}
            />
            <Toggle
              label="Auto-save drafts"
              description="Automatically save your progress."
              checked={settings.autoSave}
              onChange={() => toggleSetting("autoSave")}
            />
          </Section>

          {/* Security */}
          <Section title="Security">
            <button className="w-full text-left text-sm text-white hover:text-indigo-400 transition">
              Reset Password
            </button>
            <button className="w-full text-left text-sm text-white hover:text-indigo-400 transition mt-1">
              Enable Two-Factor Authentication (2FA)
            </button>
          </Section>

          {/* Connected Services */}
          <Section title="Connections">
            <Toggle
              label="GitHub Connected"
              description="Sync projects and contributions."
              checked={settings.connectedGitHub}
              onChange={() => toggleSetting("connectedGitHub")}
            />
            <Toggle
              label="Google Connected"
              description="Sync profile and calendar."
              checked={settings.connectedGoogle}
              onChange={() => toggleSetting("connectedGoogle")}
            />
          </Section>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t border-zinc-800 gap-2">
            <button
              className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-200"
              onClick={() => setSettings({
                emailNotifications: true,
                showOnlineStatus: true,
                darkMode: true,
                autoSave: false,
                connectedGitHub: true,
                connectedGoogle: false,
              })}
            >
              Reset to Defaults
            </button>

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

function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        className="mt-1 accent-indigo-400"
        checked={checked}
        onChange={onChange}
      />
      <div>
        <p className="text-zinc-300 text-sm">{label}</p>
        <p className="text-zinc-500 text-xs">{description}</p>
      </div>
    </label>
  );
}
