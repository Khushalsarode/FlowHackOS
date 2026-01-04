// CommunityPage.jsx
import React from "react";
import { FaUsers, FaGlobe, FaComments, FaHandshake } from "react-icons/fa";

const communityStats = [
  {
    icon: <FaUsers className="text-4xl text-purple-400" />,
    title: "Active Hackers",
    description: "See who is currently in flow, thinking, or stuck, and connect instantly.",
  },
  {
    icon: <FaGlobe className="text-4xl text-blue-400" />,
    title: "Global Presence",
    description: "Track hackers worldwide, their skills, and active projects in real time.",
  },
  {
    icon: <FaComments className="text-4xl text-green-400" />,
    title: "Team Chat",
    description: "Collaborate with your team in dedicated chat channels or voice rooms.",
  },
  {
    icon: <FaHandshake className="text-4xl text-yellow-400" />,
    title: "Collaboration",
    description: "Join teams, participate in hackathons, and share knowledge with the community.",
  },
];

// Example list of teams (can be dynamic later)
const teams = [
  { name: "Alpha Hackers", members: 12, status: "In Flow" },
  { name: "Beta Builders", members: 8, status: "Thinking" },
  { name: "Gamma Geeks", members: 15, status: "Stuck" },
  { name: "Delta Devs", members: 9, status: "Offline" },
];

const statusColors = {
  "In Flow": "bg-green-400",
  Thinking: "bg-yellow-400",
  Stuck: "bg-red-500",
  Offline: "bg-gray-500",
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white py-12 px-6 md:px-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">HackFLOW Community</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Connect with hackers around the world, join teams, and stay in flow together.
        </p>
      </section>

      {/* Community Stats */}
      <section className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {communityStats.map((stat, i) => (
          <div
            key={i}
            className="bg-zinc-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition transform cursor-pointer"
          >
            <div className="mb-4">{stat.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
            <p className="text-zinc-300">{stat.description}</p>
          </div>
        ))}
      </section>

      {/* Teams Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Active Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team, i) => (
            <div
              key={i}
              className="bg-zinc-800 p-6 rounded-2xl shadow-lg flex justify-between items-center hover:scale-105 transition transform cursor-pointer"
            >
              <div>
                <h3 className="text-xl font-bold">{team.name}</h3>
                <p className="text-zinc-400 text-sm">{team.members} members</p>
              </div>
              <div
                className={`w-4 h-4 rounded-full ${statusColors[team.status]}`}
                title={team.status}
              ></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Community</h2>
        <p className="text-zinc-400 mb-6">
          Sign up, join a team, and collaborate with hackers around the globe.
        </p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition">
          Join Now
        </button>
      </section>
    </div>
  );
}
