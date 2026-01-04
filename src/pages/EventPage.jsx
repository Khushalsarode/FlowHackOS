import { useState } from "react";
import {
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaUsers,
  FaGift,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

export default function EventPage() {
  const [expandedAgenda, setExpandedAgenda] = useState(null);

  const event = {
    title: "HackFLOW Global Hackathon 2026",
    banner: "https://images.unsplash.com/photo-1581091215364-234d0fae0b70?auto=format&fit=crop&w=1470&q=80",
    date: "Jan 25-27, 2026",
    location: "Virtual & San Francisco, CA",
    description: "Join the most exciting global hackathon! Build, collaborate, and showcase your skills to win prizes and network with mentors.",
    rules: [
      "Teams of up to 5 members",
      "Projects must be original",
      "Use of external APIs allowed",
      "Submission before deadline"
    ],
    prizes: [
      "1st Place: $5000 + Trophy",
      "2nd Place: $3000 + Certificate",
      "3rd Place: $1000 + Swag"
    ],
    agenda: [
      { time: "Jan 25, 09:00 AM", title: "Opening Ceremony" },
      { time: "Jan 25, 10:00 AM", title: "Team Formation & Idea Pitch" },
      { time: "Jan 25, 01:00 PM", title: "Workshop: AI in 2026" },
      { time: "Jan 26, 09:00 AM", title: "Coding Sprint Begins" },
      { time: "Jan 27, 05:00 PM", title: "Submission Deadline" },
      { time: "Jan 27, 07:00 PM", title: "Awards & Closing Ceremony" }
    ],
    speakers: [
      { name: "Alice Johnson", role: "AI Mentor", avatar: "https://i.pravatar.cc/100?u=alice" },
      { name: "Bob Smith", role: "Web3 Mentor", avatar: "https://i.pravatar.cc/100?u=bob" },
      { name: "Clara Lee", role: "Fullstack Mentor", avatar: "https://i.pravatar.cc/100?u=clara" }
    ],
    participants: [
      { name: "Team Phoenix", members: 4 },
      { name: "Code Ninjas", members: 3 },
      { name: "Quantum Hackers", members: 5 },
      { name: "Pixel Pioneers", members: 2 }
    ]
  };

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 px-4">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Event Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
            <h1 className="text-4xl font-bold text-white">{event.title}</h1>
            <p className="text-zinc-300 mt-1">{event.date} • {event.location}</p>
          </div>
        </div>

        {/* Event Description */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">About the Event</h2>
          <p className="text-zinc-400">{event.description}</p>
        </div>

        {/* Rules & Prizes */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Card title="Rules" icon={<FaClock />}>
            <ul className="list-disc list-inside text-zinc-400 space-y-1">
              {event.rules.map((rule, i) => <li key={i}>{rule}</li>)}
            </ul>
          </Card>
          <Card title="Prizes" icon={<FaGift />}>
            <ul className="list-disc list-inside text-zinc-400 space-y-1">
              {event.prizes.map((prize, i) => <li key={i}>{prize}</li>)}
            </ul>
          </Card>
        </div>

        {/* Agenda */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Agenda</h2>
          {event.agenda.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-800 p-3 rounded mb-2 cursor-pointer hover:bg-zinc-700"
              onClick={() => setExpandedAgenda(expandedAgenda === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">{item.time}</span>
                <div className="flex items-center gap-2 text-white font-medium">
                  {item.title}
                  {expandedAgenda === i ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              {expandedAgenda === i && (
                <p className="text-zinc-400 text-sm mt-2">
                  Detailed description for {item.title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Speakers */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Speakers & Mentors</h2>
          <div className="flex flex-wrap gap-4">
            {event.speakers.map((s, i) => (
              <div key={i} className="bg-zinc-800 rounded-xl p-4 flex flex-col items-center w-32">
                <img src={s.avatar} className="w-20 h-20 rounded-full border-2 border-indigo-400" />
                <p className="text-white font-medium mt-2">{s.name}</p>
                <p className="text-zinc-400 text-sm">{s.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Participants */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Participants & Teams</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {event.participants.map((team, i) => (
              <div key={i} className="bg-zinc-800 p-4 rounded flex justify-between items-center">
                <p className="text-white font-medium">{team.name}</p>
                <p className="text-zinc-400">{team.members} members</p>
              </div>
            ))}
          </div>
        </div>

        {/* Register Button */}
        <div className="flex justify-center">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition">
            Register Now
          </button>
        </div>

      </div>
    </main>
  );
}

/* ---------- Components ---------- */

function Card({ title, icon, children }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-indigo-400 text-lg">
        {icon} <h3 className="text-white font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
