// TeamModule.jsx
import { useState } from "react";
import {
  FaUserPlus,
  FaChevronDown,
  FaChevronUp,
  FaCircle,
  FaSave,
  FaSync
} from "react-icons/fa";

const DUMMY_TEAM = [
  {
    name: "Khushal",
    role: "Owner / Frontend",
    avatar: "https://i.pravatar.cc/100?img=12",
    flowScore: 78,
    points: 160,
    status: "active",
    notes: "UI architecture, Tailwind setup, workspace shell",
    dirty: false,
    lastSaved: new Date(),
    syncing: false
  },
  {
    name: "Aarya",
    role: "Backend / APIs",
    avatar: "https://i.pravatar.cc/100?img=32",
    flowScore: 65,
    points: 110,
    status: "idle",
    notes: "Mongo schemas, Auth0 integration, APIs",
    dirty: false,
    lastSaved: new Date(),
    syncing: false
  },
  {
    name: "Rohit",
    role: "AI / Strategy",
    avatar: "https://i.pravatar.cc/100?img=45",
    flowScore: 88,
    points: 190,
    status: "active",
    notes: "Prompt logic, scope killer, judging strategy",
    dirty: false,
    lastSaved: new Date(),
    syncing: false
  }
];

export default function TeamModule({ workspaceIdea }) {
  const [team, setTeam] = useState(
    workspaceIdea?.team?.length
      ? workspaceIdea.team
      : DUMMY_TEAM
  );

  const [expanded, setExpanded] = useState(null);
  const [newMember, setNewMember] = useState("");

  const avgFlow =
    team.length > 0
      ? Math.round(
          team.reduce((a, b) => a + (b.flowScore || 0), 0) / team.length
        )
      : 0;

  /* ------------------ Actions ------------------ */

  const addMember = () => {
    if (!newMember.trim()) return;

    setTeam(prev => [
      ...prev,
      {
        name: newMember,
        role: "Contributor",
        avatar: "https://i.pravatar.cc/100?u=" + newMember,
        flowScore: 0,
        points: 0,
        status: "idle",
        notes: "",
        dirty: false,
        lastSaved: null,
        syncing: false
      }
    ]);
    setNewMember("");
  };

  const updateNotes = (idx, value) => {
    const updated = [...team];
    updated[idx].notes = value;
    updated[idx].dirty = true;
    setTeam(updated);
  };

  const toggleStatus = (idx) => {
    const updated = [...team];
    updated[idx].status =
      updated[idx].status === "active" ? "idle" : "active";
    updated[idx].dirty = true;
    setTeam(updated);
  };

  const saveMember = (idx) => {
    const updated = [...team];
    updated[idx].syncing = true;
    setTeam(updated);

    setTimeout(() => {
      updated[idx].dirty = false;
      updated[idx].syncing = false;
      updated[idx].lastSaved = new Date();
      setTeam([...updated]);
    }, 800);
  };

  /* ------------------ UI ------------------ */

  return (
    <div className="bg-zinc-800 p-6 rounded-xl shadow space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-white">
          Team Workspace
        </h2>
        <p className="text-zinc-400 text-sm">
          Avg Flow Score:{" "}
          <span className="text-indigo-400">{avgFlow}</span>
        </p>
      </div>

      {/* Team List */}
      <div className="space-y-3">
        {team.map((member, idx) => (
          <div key={idx} className="bg-zinc-700 rounded-lg p-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  className="w-12 h-12 rounded-full border border-zinc-600"
                />
                <div>
                  <p className="text-white font-medium">
                    {member.name}
                  </p>
                  <p className="text-zinc-400 text-sm">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleStatus(idx)}
                  className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white"
                >
                  <FaCircle
                    className={`text-xs ${
                      member.status === "active"
                        ? "text-green-400"
                        : "text-zinc-400"
                    }`}
                  />
                  {member.status}
                </button>

                <span className="text-zinc-300 text-sm">
                  {member.points} pts
                </span>

                <button
                  onClick={() =>
                    setExpanded(expanded === idx ? null : idx)
                  }
                  className="text-zinc-300 hover:text-white"
                >
                  {expanded === idx ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
            </div>

            {/* Expanded */}
            {expanded === idx && (
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm text-zinc-300">
                  <span>Flow Score</span>
                  <span>{member.flowScore}/100</span>
                </div>

                <div className="w-full bg-zinc-600 h-2 rounded">
                  <div
                    className="bg-indigo-500 h-2 rounded"
                    style={{ width: `${member.flowScore}%` }}
                  />
                </div>

                <textarea
                  value={member.notes}
                  onChange={e =>
                    updateNotes(idx, e.target.value)
                  }
                  placeholder="Notes / responsibilities..."
                  className="w-full p-2 rounded bg-zinc-800 text-white text-sm"
                />

                {member.dirty && (
                  <button
                    onClick={() => saveMember(idx)}
                    className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded text-sm"
                  >
                    {member.syncing ? (
                      <>
                        <FaSync className="animate-spin" />
                        Syncing
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Member */}
      <div className="flex gap-2">
        <input
          value={newMember}
          onChange={e => setNewMember(e.target.value)}
          placeholder="Add teammate..."
          className="flex-1 p-2 rounded bg-zinc-700 text-white"
        />
        <button
          onClick={addMember}
          className="bg-indigo-500 px-3 py-2 rounded hover:bg-indigo-600 text-white"
        >
          <FaUserPlus />
        </button>
      </div>
    </div>
  );
}
