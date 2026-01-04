// FeaturesPage.jsx
import React from "react";
import { FaUsers, FaMapMarkedAlt, FaGamepad, FaBomb, FaChartPie, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    title: "Flow Engine",
    description: "Detects your state: In Flow / Thinking / Stuck, and suggests next actions.",
    icon: <FaChartPie className="text-4xl text-green-400" />,
    tech: ["Gemini", "MongoDB"],
  },
  {
    title: "Scope Killer",
    description: "Kills over-engineered features and explains why. Optional roast mode.",
    icon: <FaBomb className="text-4xl text-red-500" />,
    tech: ["Gemini", "MongoDB", "ElevenLabs (optional)"],
  },
  {
    title: "Demo Arena",
    description: "AI judges your demo with boredom meter and voice feedback.",
    icon: <FaGamepad className="text-4xl text-yellow-400" />,
    tech: ["Gemini", "ElevenLabs", "MongoDB"],
  },
  {
    title: "HackMap",
    description: "See hackers globally, their skills, and flow status.",
    icon: <FaMapMarkedAlt className="text-4xl text-blue-400" />,
    tech: ["Leaflet.js", "MongoDB"],
  },
  {
    title: "Teams",
    description: "Create/join teams and track team flow score.",
    icon: <FaUsers className="text-4xl text-purple-400" />,
    tech: ["MongoDB"],
  },
  {
    title: "Gamification",
    description: "Momentum score, streaks, and badges to keep hackers motivated.",
    icon: <FaTrophy className="text-4xl text-pink-400" />,
    tech: ["MongoDB"],
  },
];

const badges = [
  { name: "First Flow", color: "bg-green-500" },
  { name: "Scope Slayer", color: "bg-red-500" },
  { name: "Demo Survivor", color: "bg-yellow-400" },
  { name: "Shipped MVP", color: "bg-blue-400" },
];

const statusDots = [
  { label: "In Flow", color: "bg-green-400" },
  { label: "Thinking", color: "bg-yellow-400" },
  { label: "Stuck", color: "bg-red-500" },
  { label: "Offline", color: "bg-gray-500" },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white py-12 px-6 md:px-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">HackFLOW OS – Core Features</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Everything you need to stay in flow, ship faster, and impress judges.
        </p>
        <button className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition">
          Start a Flow Session
        </button>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Core Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-zinc-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition transform cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-zinc-300 mb-3 text-center">{feature.description}</p>
              <div className="flex justify-center flex-wrap gap-2">
                {feature.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-zinc-700 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flow Status & Badges Section */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Flow Status & Gamification</h2>
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          {statusDots.map((status, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full ${status.color} mb-2 animate-pulse`}
              ></div>
              <span className="text-zinc-300 text-sm">{status.label}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {badges.map((badge, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-full font-semibold ${badge.color}`}
            >
              {badge.name}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to boost your flow?</h2>
        <p className="text-zinc-400 mb-6">
          Login now and start your 25-minute Flow Session.
        </p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition">
          Login & Start
        </button>
      </section>
    </div>
  );
}
