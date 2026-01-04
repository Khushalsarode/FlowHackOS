// AboutPage.jsx
import React from "react";
import { FaLightbulb, FaRocket, FaUsers, FaDatabase } from "react-icons/fa";

const highlights = [
  {
    icon: <FaLightbulb className="text-4xl text-yellow-400" />,
    title: "Our Vision",
    description:
      "To empower hackers and makers to stay in flow, ship faster, and achieve peak productivity with AI-assisted guidance.",
  },
  {
    icon: <FaRocket className="text-4xl text-green-400" />,
    title: "Our Mission",
    description:
      "Provide an all-in-one platform that combines momentum tracking, AI insights, scope management, and gamification to help teams and individuals deliver better results.",
  },
  {
    icon: <FaUsers className="text-4xl text-purple-400" />,
    title: "Who We Are",
    description:
      "A group of passionate developers and hackers focused on improving workflow, reducing scope creep, and enhancing team collaboration.",
  },
  {
    icon: <FaDatabase className="text-4xl text-blue-400" />,
    title: "Tech Stack",
    description:
      "Built with React, TailwindCSS, Node.js, MongoDB, Leaflet.js, Gemini AI, and ElevenLabs for voice feedback and AI integration.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white py-12 px-6 md:px-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">About HackFLOW OS</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          HackFLOW OS is your ultimate productivity companion for hackers and makers—keeping you in flow, reducing distractions, and helping you ship better projects faster.
        </p>
      </section>

      {/* Highlights Section */}
      <section className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {highlights.map((item, i) => (
          <div
            key={i}
            className="bg-zinc-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition transform cursor-pointer"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-zinc-300">{item.description}</p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Join the HackFLOW Revolution</h2>
        <p className="text-zinc-400 mb-6">
          Stay in flow, collaborate with your team, and take your productivity to the next level.
        </p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition">
          Get Started
        </button>
      </section>
    </div>
  );
}
