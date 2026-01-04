// ProgressTracker.jsx
import React, { useState } from "react";
import { FaCheck, FaPlus, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function ProgressTracker({ workspaceIdea }) {
  const [stages, setStages] = useState(
    workspaceIdea?.stages || [
      { name: "Ideation", completed: true, notes: "", link: "", points: 10, expanded: false },
      { name: "Research", completed: false, notes: "", link: "", points: 10, expanded: false },
      { name: "Planning", completed: false, notes: "", link: "", points: 10, expanded: false },
      { name: "Prototyping", completed: false, notes: "", link: "", points: 15, expanded: false },
      { name: "Development", completed: false, notes: "", link: "", points: 20, expanded: false },
      { name: "Testing", completed: false, notes: "", link: "", points: 10, expanded: false },
      { name: "Pitch Preparation", completed: false, notes: "", link: "", points: 10, expanded: false },
      { name: "Demo / Presentation", completed: false, notes: "", link: "", points: 15, expanded: false },
      { name: "Feedback & Iteration", completed: false, notes: "", link: "", points: 10, expanded: false },
      { name: "Deployment", completed: false, notes: "", link: "", points: 15, expanded: false },
      { name: "Post-Hackathon Growth", completed: false, notes: "", link: "", points: 20, expanded: false },
    ]
  );

  const [newStageName, setNewStageName] = useState("");

  const totalPoints = stages.reduce((acc, s) => acc + s.points, 0);
  const earnedPoints = stages.filter(s => s.completed).reduce((acc, s) => acc + s.points, 0);
  const progressPercent = Math.round((earnedPoints / totalPoints) * 100);

  const toggleStage = (idx) => {
    const updated = [...stages];
    updated[idx].completed = !updated[idx].completed;
    setStages(updated);
  };

  const toggleExpand = (idx) => {
    const updated = [...stages];
    updated[idx].expanded = !updated[idx].expanded;
    setStages(updated);
  };

  const addStage = () => {
    if (!newStageName.trim()) return;
    setStages(prev => [...prev, { name: newStageName.trim(), completed: false, notes: "", link: "", points: 10, expanded: false }]);
    setNewStageName("");
  };

  const updateNotes = (idx, value) => {
    const updated = [...stages];
    updated[idx].notes = value;
    setStages(updated);
  };

  const updateLink = (idx, value) => {
    const updated = [...stages];
    updated[idx].link = value;
    setStages(updated);
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-lg space-y-6">
      {/* Overall Progress */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Overall Progress</h2>
        <div className="w-full bg-zinc-700 rounded-full h-4">
          <div
            className="bg-indigo-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-zinc-300 mt-2">
          {progressPercent}% Complete ({earnedPoints}/{totalPoints} points)
        </p>
      </div>

      {/* Stages */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Project Stages</h2>
        <ul className="space-y-3">
          {stages.map((stage, idx) => (
            <li
              key={idx}
              className={`p-3 rounded-lg border border-zinc-700 flex flex-col transition-colors ${
                stage.completed ? "bg-green-700 text-white" : "bg-zinc-700 text-zinc-300"
              }`}
            >
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleExpand(idx)}>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">{stage.name}</span>
                  {stage.completed && <FaCheck className="text-white" />}
                  <span className="text-sm text-zinc-300 ml-2">({stage.points} pts)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleStage(idx); }}
                    className={`p-1 rounded ${stage.completed ? "bg-green-600 hover:bg-green-500" : "bg-indigo-600 hover:bg-indigo-500"}`}
                  >
                    {stage.completed ? <FaCheck /> : "Mark Complete"}
                  </button>
                  {stage.expanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {stage.expanded && (
                <div className="mt-2 space-y-2">
                  <input
                    type="text"
                    placeholder="Add notes..."
                    value={stage.notes}
                    onChange={(e) => updateNotes(idx, e.target.value)}
                    className="w-full p-2 rounded bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add link (optional)"
                      value={stage.link}
                      onChange={(e) => updateLink(idx, e.target.value)}
                      className="flex-1 p-2 rounded bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none"
                    />
                    {stage.link && (
                      <a href={stage.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline flex items-center gap-1">
                        Open <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Add new stage */}
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            placeholder="Add new stage..."
            value={newStageName}
            onChange={(e) => setNewStageName(e.target.value)}
            className="flex-1 p-2 rounded bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none"
          />
          <button
            onClick={addStage}
            className="bg-indigo-500 text-white px-3 py-2 rounded hover:bg-indigo-600 flex items-center gap-1"
          >
            <FaPlus /> Add Stage
          </button>
        </div>
      </div>
    </div>
  );
}
