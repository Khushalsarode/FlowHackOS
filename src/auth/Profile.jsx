// Profile.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEdit, FaSave, FaMapMarkerAlt } from "react-icons/fa";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  
  const storageKey = `hackflow-profile-${user?.sub}`;

  const [profile, setProfile] = useState({
    city: "",
    role: "Builder",
    bio: "",
    skills: [],
    hacksCompleted: 0,
    avgFlow: 0,
    points: 0,
    streak: 0,
    teams: 0,
    recentHacks: []
  });

  const [skillInput, setSkillInput] = useState("");
  const [editing, setEditing] = useState(false);

  /* ---------------- Load / Save ---------------- */

  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setProfile(JSON.parse(saved));
  }, [user]);

  const saveProfile = () => {
    localStorage.setItem(storageKey, JSON.stringify(profile));
    setEditing(false);
  };

  /* ---------------- Guards ---------------- */

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400">
        Loading profile…
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/" />;

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 px-4">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* HEADER */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-center">
          <img
            src={user.picture}
            className="w-32 h-32 rounded-full border-4 border-indigo-400"
          />

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white">
              {user.name}
            </h1>
            <p className="text-zinc-400">{user.email}</p>

            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              <Badge label={user.sub.split("|")[0]} />
              <Badge label="HackFLOW Member" />
              <Badge label="Active" green />
            </div>
          </div>

          <button
            onClick={() => (editing ? saveProfile() : setEditing(true))}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg"
          >
            {editing ? <FaSave /> : <FaEdit />}
            {editing ? "Save" : "Edit"}
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <Stat label="Hacks" value={profile.hacksCompleted} />
          <Stat label="Avg Flow" value={profile.avgFlow} />
          <Stat label="Points" value={profile.points} />
          <Stat label="Streak" value={`${profile.streak}🔥`} />
          <Stat label="Teams" value={profile.teams} />
        </div>

        {/* ABOUT */}
        <Section title="About You">
          {editing ? (
            <textarea
              value={profile.bio}
              onChange={e =>
                setProfile({ ...profile, bio: e.target.value })
              }
              placeholder="Your hackathon journey, interests, mindset…"
              className="w-full p-3 bg-zinc-800 rounded text-white"
            />
          ) : (
            <p className="text-zinc-400 text-sm">
              {profile.bio || "No bio added yet."}
            </p>
          )}
        </Section>

        {/* LOCATION & ROLE */}
        <Section title="Details">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="City"
              icon={<FaMapMarkerAlt />}
              value={profile.city}
              editing={editing}
              onChange={v => setProfile({ ...profile, city: v })}
            />
            <Field
              label="Role"
              value={profile.role}
              editing={editing}
              onChange={v => setProfile({ ...profile, role: v })}
            />
          </div>
        </Section>

        {/* SKILLS */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s, i) => (
              <span
                key={i}
                className="bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-full text-sm"
              >
                {s}
              </span>
            ))}
          </div>

          {editing && (
            <div className="flex gap-2 mt-3">
              <input
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                placeholder="Add skill"
                className="flex-1 p-2 rounded bg-zinc-800 text-white"
              />
              <button
                onClick={() => {
                  if (!skillInput) return;
                  setProfile({
                    ...profile,
                    skills: [...profile.skills, skillInput]
                  });
                  setSkillInput("");
                }}
                className="bg-indigo-500 px-4 rounded text-white"
              >
                Add
              </button>
            </div>
          )}
        </Section>

        {/* HACK HISTORY */}
        <Section title="Hackathon Activity">
          {profile.recentHacks.length === 0 ? (
            <p className="text-zinc-500 text-sm">
              No hacks recorded yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {profile.recentHacks.map((h, i) => (
                <li
                  key={i}
                  className="bg-zinc-800 p-3 rounded text-sm text-zinc-300"
                >
                  {h}
                </li>
              ))}
            </ul>
          )}
        </Section>

      </div>
    </main>
  );
}

/* ---------------- Reusable UI ---------------- */

function Section({ title, children }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
      <p className="text-zinc-400 text-xs uppercase">{label}</p>
      <p className="text-white text-xl font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}

function Badge({ label, green }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs border ${
        green
          ? "bg-green-500/20 text-green-400 border-green-500/30"
          : "bg-zinc-800 text-zinc-300 border-zinc-700"
      }`}
    >
      {label}
    </span>
  );
}

function Field({ label, value, editing, onChange, icon }) {
  return (
    <div>
      <label className="text-zinc-400 text-xs">{label}</label>
      {editing ? (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full p-2 bg-zinc-800 rounded text-white mt-1"
        />
      ) : (
        <p className="text-white mt-1 flex items-center gap-2">
          {icon} {value || "—"}
        </p>
      )}
    </div>
  );
}
