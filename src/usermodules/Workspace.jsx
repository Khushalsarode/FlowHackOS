import { useIdeas } from "../hackideas/IdeasContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import ScopeKiller from "./workspace/components/ScopeKiller";
import DemoArena from "./workspace/DemoArena";
import ProgressTracker from "./workspace/ProgressTracker";

import { FlowProvider } from "./workspace/context/FlowContext";
import FlowTimer from "./workspace/components/FlowTimer";
import MomentumCard from "./workspace/components/MomentumCard";
import FlowChatGemini from "./workspace/components/FlowChatGemini";

import TeamModule from "../usermodules/workspace/TeamModule";
export default function Workspace() {
    const { workspaceIdea: contextIdea, setWorkspaceIdea } = useIdeas();
    const navigate = useNavigate();
    const location = useLocation();

    const [workspaceIdea, setLocalWorkspaceIdea] = useState(null);
    const [activeTab, setActiveTab] = useState("team");

    // Load workspace idea
    useEffect(() => {
        if (location.state?.idea) {
            setLocalWorkspaceIdea(location.state.idea);
            setWorkspaceIdea(location.state.idea);
            localStorage.setItem("workspaceIdea", JSON.stringify(location.state.idea));
        } else if (contextIdea) {
            setLocalWorkspaceIdea(contextIdea);
        } else {
            const saved = localStorage.getItem("workspaceIdea");
            if (saved) setLocalWorkspaceIdea(JSON.parse(saved));
        }
    }, [location.state, contextIdea, setWorkspaceIdea]);

    if (!workspaceIdea) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400 pt-16">
                <p className="text-lg">
                    No idea selected. Go back to{" "}
                    <span
                        className="text-indigo-400 cursor-pointer"
                        onClick={() => navigate("/station")}
                    >
                        Station
                    </span>
                    .
                </p>
            </div>
        );
    }

    const { title, shortDesc, fullDesc, status, team } = workspaceIdea;

    return (
        <FlowProvider>
            <div className="flex pt-16 bg-zinc-900 text-white">


                {/* Sidebar */}
                <div className="w-60 bg-zinc-800 p-4 space-y-3 shrink-0">
                    {[
                        ["team", "Team"],
                        ["flow", "Flow Engine"],
                        ["scope", "Scope Killer"],
                        ["demo", "Demo Arena"],
                        ["progress", "Progress"],
                    ].map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`w-full text-left px-3 py-2 rounded transition
        ${activeTab === key
                                    ? "bg-indigo-600"
                                    : "hover:bg-zinc-700 text-zinc-300"}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>


                {/* Main Content */}
                <div className="flex-1 ml-60 p-8 space-y-6 overflow-y-auto">

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p className="text-zinc-400 mt-1">
                            <strong>Status:</strong> {status}
                        </p>
                    </div>

                    {/* Descriptions */}
                    {shortDesc && (
                        <p className="text-zinc-300">
                            <strong>Short:</strong> {shortDesc}
                        </p>
                    )}
                    {fullDesc && (
                        <p className="text-zinc-300 whitespace-pre-wrap">
                            <strong>Details:</strong> {fullDesc}
                        </p>
                    )}

                    {/* TEAM TAB */}
                    {activeTab === "team" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-3">Team Members</h2>
                            <div className="flex flex-wrap gap-4">
                                {team?.length ? (
                                    team.map((member, idx) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col items-center bg-zinc-800 p-3 rounded-lg"
                                        >
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="w-12 h-12 rounded-full mb-1"
                                            />
                                            <span className="text-sm text-zinc-300">
                                                {member.name}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-zinc-400">No team members assigned.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* FLOW TAB */}
                    {activeTab === "flow" && <FlowEngine />}

                    {/* OTHER MODULES */}
                    {activeTab === "scope" && <ScopeKiller workspaceIdea={workspaceIdea} />}
                    {activeTab === "demo" && <DemoArena workspaceIdea={workspaceIdea} />}
                    {activeTab === "progress" && <ProgressTracker workspaceIdea={workspaceIdea} />}
                    {activeTab === "team" && <TeamModule workspaceIdea={workspaceIdea} />}

                </div>
            </div>
        </FlowProvider>
    );
}

/* ================= FLOW ENGINE ================= */

function FlowEngine({ ideaId }) {
    return (
        <div className="flex flex-col gap-6">
            {/* Top row: Momentum + Flow Timer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Momentum */}
                <div className="bg-zinc-800 rounded-xl p-6 shadow">
                    <MomentumCard />
                </div>

                {/* Flow Timer */}
                <div className="bg-zinc-800 rounded-xl p-6 shadow">
                    <FlowTimer />
                </div>
            </div>

            {/* Full-width AI Chat */}
            <div className="bg-zinc-800 rounded-xl p-6 shadow mx-auto w-full md:w-3/4">
                <FlowChatGemini ideaId={ideaId} apiKey={import.meta.env.VITE_GEMINI_KEY} />
            </div>
        </div>
    );
}
