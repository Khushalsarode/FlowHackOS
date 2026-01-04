// HowItWorksPage.jsx
import React from "react";
import { FaPlayCircle, FaBrain, FaBolt, FaUsers, FaTrophy } from "react-icons/fa";

const steps = [
  {
    title: "Start a Flow Session",
    description:
      "Login and begin your 25-minute flow session. HackFLOW OS tracks your momentum and keeps you focused.",
    icon: <FaPlayCircle className="text-4xl text-blue-500" />,
  },
  {
    title: "AI-Powered State Detection",
    description:
      "Our Flow Engine detects your current state: In Flow, Thinking, or Stuck, and suggests your next actions to maximize productivity.",
    icon: <FaBrain className="text-4xl text-green-400" />,
  },
  {
    title: "Scope Killer Analysis",
    description:
      "Scope Killer identifies over-engineered features, explains why, and optionally roasts your ideas to keep development lean and focused.",
    icon: <FaBolt className="text-4xl text-red-500" />,
  },
  {
    title: "Collaborate with Teams",
    description:
      "Create or join teams, track flow scores, and see your teammates’ progress in real-time using HackMap.",
    icon: <FaUsers className="text-4xl text-purple-400" />,
  },
  {
    title: "Gamification & Rewards",
    description:
      "Earn momentum points, streaks, and badges for completing sessions and shipping features. Stay motivated and competitive!",
    icon: <FaTrophy className="text-4xl text-pink-400" />,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white py-12 px-6 md:px-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">How HackFLOW OS Works</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          HackFLOW OS keeps you in flow, removes distractions, and guides you step by step to ship faster and smarter.
        </p>
      </section>

      {/* Steps Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">{step.icon}</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-zinc-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flow Status & Gamification Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Stay on Track & Get Rewarded</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
          Track your flow status in real-time, see your team’s performance, and collect badges for completing milestones.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <span className="px-4 py-2 rounded-full bg-green-500 font-semibold">First Flow</span>
          <span className="px-4 py-2 rounded-full bg-red-500 font-semibold">Scope Slayer</span>
          <span className="px-4 py-2 rounded-full bg-yellow-400 font-semibold">Demo Survivor</span>
          <span className="px-4 py-2 rounded-full bg-blue-400 font-semibold">Shipped MVP</span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Flow?</h2>
        <p className="text-zinc-400 mb-6">
          Login now and start your 25-minute Flow Session with HackFLOW OS.
        </p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition">
          Login & Start
        </button>
      </section>
    </div>
  );
}
