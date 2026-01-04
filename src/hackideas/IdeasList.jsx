import { useIdeas } from "./IdeasContext";
import { useState } from "react";
import { FiEdit, FiTrash2, FiCheck, FiUserPlus, FiFolder, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function IdeasList() {
    const navigate = useNavigate();
    const { ideas, activeIdeaId, setActiveIdeaId, deleteIdea, updateIdea, setWorkspaceIdea } = useIdeas();
    const [expandedCards, setExpandedCards] = useState({});
    const [editIdeaId, setEditIdeaId] = useState(null);
    const [editData, setEditData] = useState({ title: "", shortDesc: "", fullDesc: "" });
    const [showAllMembersCards, setShowAllMembersCards] = useState({});

    if (!ideas.length)
        return (
            <p className="text-zinc-400 text-center mt-12 text-lg">
                No ideas yet. Add one above!
            </p>
        );

    const handleEditClick = (idea) => {
        setEditIdeaId(idea._id); // use _id from MongoDB
        setEditData({ title: idea.title, shortDesc: idea.shortDesc, fullDesc: idea.fullDesc });
    };

    const handleUpdate = (id) => {
        updateIdea(id, editData.title, editData.shortDesc, editData.fullDesc, ideas.find(i => i._id === id)?.status || "active");
        setEditIdeaId(null);
    };

    const toggleCardExpand = (id, e) => {
        e.stopPropagation();
        setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
                Your Hack Ideas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideas.map((idea) => {
                    const isActive = idea._id === activeIdeaId;
                    const isEditing = idea._id === editIdeaId;
                    const isNew = Date.now() - new Date(idea.createdAt).getTime() < 24 * 60 * 60 * 1000;
                    const isExpanded = !!expandedCards[idea._id];

                    return (
                        <div
                            key={idea._id}
                            className={`flex flex-col justify-between p-6 rounded-3xl border shadow-2xl transition-all duration-300 cursor-pointer
              ${isActive ? "border-indigo-500 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-800" : "border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:scale-[1.03]"}`}
                            onClick={() => setActiveIdeaId(idea._id)}
                        >
                            {/* Title */}
                            {isEditing ? (
                                <input
                                    value={editData.title}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                    className="w-full mb-3 p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                                />
                            ) : (
                                <h3 className="text-white font-semibold text-xl mb-2 flex items-center justify-between">
                                    {idea.title}
                                    {isNew && (
                                        <span className="ml-2 text-xs font-semibold bg-indigo-500 px-3 py-0.5 rounded-full animate-pulse">
                                            NEW
                                        </span>
                                    )}
                                </h3>
                            )}

                            {/* Short Description */}
                            {isEditing ? (
                                <input
                                    value={editData.shortDesc}
                                    onChange={(e) => setEditData({ ...editData, shortDesc: e.target.value })}
                                    className="w-full mb-3 p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                                />
                            ) : (
                                idea.shortDesc && <p className="text-zinc-400 text-sm mb-3">{idea.shortDesc}</p>
                            )}

                            {/* Full Description */}
                            {idea.fullDesc && (
                                <div className="mb-3">
                                    {isEditing ? (
                                        <textarea
                                            value={editData.fullDesc}
                                            onChange={(e) => setEditData({ ...editData, fullDesc: e.target.value })}
                                            className="w-full p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500 mb-2"
                                        />
                                    ) : (
                                        <>
                                            <p
                                                className="text-sm mb-1 whitespace-pre-wrap text-zinc-500"
                                                style={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: isExpanded ? "none" : 3,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {idea.fullDesc}
                                            </p>
                                            <button
                                                onClick={(e) => toggleCardExpand(idea._id, e)}
                                                className="text-indigo-400 text-xs font-semibold hover:underline flex items-center gap-1"
                                            >
                                                {isExpanded ? <><FiChevronUp /> Collapse</> : <><FiChevronDown /> View More</>}
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Status Dropdown */}
                            <select
                                value={idea.status || "active"}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    updateIdea(idea._id, idea.title, idea.shortDesc, idea.fullDesc, e.target.value);
                                }}
                                className="mt-2 p-2 text-sm rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-indigo-500"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <option value="active">Active</option>
                                <option value="paused">Paused</option>
                                <option value="completed">Completed</option>
                            </select>

                            {/* Bottom Section: Team + Actions */}
                            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">

                                {/* Team Avatars + Add Team */}
                                <div className="flex items-center gap-2 flex-wrap relative">
                                    {(() => {
                                        const members = idea.team?.length ? idea.team : [
                                            { name: "Alice", avatar: "https://i.pravatar.cc/150?img=32" },
                                            { name: "Bob", avatar: "https://i.pravatar.cc/150?img=12" },
                                            { name: "Charlie", avatar: "https://i.pravatar.cc/150?img=52" },
                                            { name: "David", avatar: "https://i.pravatar.cc/150?img=72" },
                                            { name: "Eve", avatar: "https://i.pravatar.cc/150?img=82" },
                                        ];
                                        const visible = members.slice(0, 3);
                                        const hiddenCount = members.length - visible.length;
                                        const showAll = !!showAllMembersCards[idea._id];

                                        return (
                                            <>
                                                {visible.map((member, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={member.avatar}
                                                        alt={member.name}
                                                        title={member.name}
                                                        className="w-8 h-8 rounded-full border-2 border-zinc-700"
                                                    />
                                                ))}

                                                {hiddenCount > 0 && (
                                                    <div
                                                        className="w-8 h-8 rounded-full border-2 border-zinc-700 bg-zinc-700 text-white text-xs flex items-center justify-center font-semibold cursor-pointer relative"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setShowAllMembersCards(prev => ({ ...prev, [idea._id]: !prev[idea._id] }));
                                                        }}
                                                        title="Show all members"
                                                    >
                                                        +{hiddenCount}

                                                        {showAll && (
                                                            <div className="absolute top-full mt-2 left-0 bg-zinc-900 text-white p-3 rounded-lg shadow-lg z-50 w-40">
                                                                <p className="font-semibold mb-1">Team Members:</p>
                                                                {members.map((m, i) => (
                                                                    <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
                                                                        <img
                                                                            src={m.avatar}
                                                                            alt={m.name}
                                                                            className="w-6 h-6 rounded-full border-2 border-zinc-700"
                                                                        />
                                                                        <span className="text-sm">{m.name}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}

                                    {/* Add teammate button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); alert("Add teammate demo working!"); }}
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white border-2 border-zinc-700 transition transform hover:scale-110"
                                        title="Add teammate"
                                    >
                                        <FiUserPlus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-2 flex-wrap w-full sm:w-auto">
                                    {isEditing ? (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleUpdate(idea._id); }}
                                            className="flex items-center gap-1 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg shadow-md font-medium transition transform hover:scale-105 w-full sm:w-auto justify-center"
                                        >
                                            <FiCheck /> Save
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleEditClick(idea); }}
                                                className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg shadow-md font-medium transition transform hover:scale-105 w-full sm:w-auto justify-center"
                                            >
                                                <FiEdit /> Edit
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deleteIdea(idea._id); }}
                                                className="flex items-center gap-1 bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg shadow-md font-medium transition transform hover:scale-105 w-full sm:w-auto justify-center"
                                            >
                                                <FiTrash2 /> Delete
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setWorkspaceIdea(idea); // save in context + localStorage
                                            navigate("/workspace", { state: { idea } }); // pass idea via router state
                                        }}
                                        className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md font-medium transition transform hover:scale-105 w-full sm:w-auto justify-center"
                                    >
                                        <FiFolder /> Workspace
                                    </button>






                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
