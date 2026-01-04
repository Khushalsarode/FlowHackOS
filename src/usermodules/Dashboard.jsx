// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { FaUsers, FaLightbulb, FaFire, FaTrophy, FaRocket } from "react-icons/fa";

export default function Dashboard() {
  /* ---------------- Dummy Data ---------------- */
  const stats = [
    { label: "Ideas Created", value: 12, icon: <FaLightbulb className="text-2xl text-indigo-400" /> },
    { label: "Flow Sessions", value: 8, icon: <FaFire className="text-2xl text-red-400" /> },
    { label: "Momentum Score", value: 78, icon: <FaRocket className="text-2xl text-yellow-400" /> },
    { label: "Badges Earned", value: 5, icon: <FaTrophy className="text-2xl text-green-400" /> },
    { label: "Team Members", value: 6, icon: <FaUsers className="text-2xl text-blue-400" /> },
  ];

  const recentIdeas = [
    { title: "HackFLOW Momentum Engine", status: "In Flow", flowScore: 88 },
    { title: "Scope Killer Module", status: "Stuck", flowScore: 40 },
    { title: "Demo or Die", status: "Thinking", flowScore: 65 },
    { title: "HackMap Module", status: "In Flow", flowScore: 90 },
  ];

  const teamActivity = [
    { name: "You", role: "Owner", flowScore: 90, points: 120, status: "active" },
    { name: "Arjun Mehta", role: "Contributor", flowScore: 85, points: 110, status: "active" },
    { name: "Diya Sharma", role: "Contributor", flowScore: 65, points: 80, status: "idle" },
    { name: "Kabir Khan", role: "Contributor", flowScore: 78, points: 95, status: "active" },
  ];

  const recentHacks = [
    { title: "AI Chatbot Integration", date: "Jan 2, 2026", points: 50 },
    { title: "Scope Creep Analyzer", date: "Jan 1, 2026", points: 40 },
    { title: "HackMap MVP", date: "Dec 30, 2025", points: 60 },
  ];

  /* ---------------- Derived Data ---------------- */
  const avgFlow = Math.round(
    teamActivity.reduce((sum, t) => sum + t.flowScore, 0) / teamActivity.length
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">

      {/* Dashboard Header */}
      <h1 className="text-3xl font-bold text-white mb-4">HackFLOW Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-zinc-800 p-4 rounded-2xl shadow-lg flex flex-col items-center gap-2 hover:scale-105 transform transition"
          >
            {stat.icon}
            <span className="text-2xl font-semibold text-white">{stat.value}</span>
            <span className="text-zinc-300 text-sm">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Recent Ideas */}
      <div className="bg-zinc-900 p-4 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Recent Ideas</h2>
        <ul className="space-y-2">
          {recentIdeas.map((idea, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition"
            >
              <div>
                <span className="font-medium text-white">{idea.title}</span>
                <span className="ml-2 text-zinc-400 text-sm">Flow Score: {idea.flowScore}</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  idea.status === "In Flow"
                    ? "bg-green-600 text-white"
                    : idea.status === "Thinking"
                    ? "bg-yellow-500 text-zinc-900"
                    : "bg-red-600 text-white"
                }`}
              >
                {idea.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Team Activity */}
      <div className="bg-zinc-900 p-4 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Team Activity (Avg Flow: {avgFlow})</h2>
        <ul className="space-y-2">
          {teamActivity.map((member, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition"
            >
              <div>
                <span className="text-white font-medium">{member.name}</span>
                <span className="ml-2 text-zinc-400 text-sm">{member.role}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-zinc-300 text-sm">{member.points} pts</span>
                <span
                  className={`text-xs ${
                    member.status === "active" ? "text-green-400" : "text-zinc-500"
                  }`}
                >
                  {member.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Hacks */}
      <div className="bg-zinc-900 p-4 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Recent Hacks / Contributions</h2>
        <ul className="space-y-2">
          {recentHacks.map((hack, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition"
            >
              <span className="text-white">{hack.title}</span>
              <span className="text-zinc-300 text-sm">{hack.date} • {hack.points} pts</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
