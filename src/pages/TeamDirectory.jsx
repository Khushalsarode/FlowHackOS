import { useState } from "react";
import { FaCircle, FaStar, FaMapMarkerAlt, FaUser, FaPaperPlane } from "react-icons/fa";

export default function TeamDirectory() {
  // Dummy data for hackers
  const dummyHackers = Array.from({ length: 30 }).map((_, i) => ({
    id: "user" + (i + 1),
    name:
      ["Alice", "Bob", "Clara", "David", "Eva", "Frank", "Grace", "Hank", "Ivy", "Jack"][i % 10] +
      " " +
      ["Johnson", "Smith", "Lee", "Kim", "Brown", "White"][i % 6],
    city: ["New York", "London", "Tokyo", "Berlin", "Paris", "Mumbai"][i % 6],
    region: ["Americas", "Europe", "Asia"][i % 3],
    skills: ["React", "Node.js", "AI", "Python", "Blockchain", "Design"][i % 6],
    points: Math.floor(Math.random() * 500),
    flowScore: Math.floor(Math.random() * 100),
    status: i % 2 === 0 ? "active" : "idle",
    avatar: `https://i.pravatar.cc/100?u=${i}`,
    requestSent: false
  }));

  const [hackers, setHackers] = useState(dummyHackers);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("All");
  const [filterRegion, setFilterRegion] = useState("All");
  const [filterSkill, setFilterSkill] = useState("All");

  const cities = ["All", ...new Set(dummyHackers.map(h => h.city))];
  const regions = ["All", ...new Set(dummyHackers.map(h => h.region))];
  const skills = ["All", ...new Set(dummyHackers.map(h => h.skills))];

  const filteredHackers = hackers.filter(h => {
    return (
      (filterCity === "All" || h.city === filterCity) &&
      (filterRegion === "All" || h.region === filterRegion) &&
      (filterSkill === "All" || h.skills === filterSkill) &&
      (search === "" || h.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const sendRequest = (id) => {
    setHackers(prev =>
      prev.map(h => h.id === id ? { ...h, requestSent: true } : h)
    );

    // Reset after 3 seconds to allow multiple testing
    setTimeout(() => {
      setHackers(prev =>
        prev.map(h => h.id === id ? { ...h, requestSent: false } : h)
      );
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 px-4">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Hackers Directory</h1>
          <p className="text-zinc-400">Browse hackers across regions, cities, and skills.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="p-2 rounded bg-zinc-800 text-white placeholder-zinc-500 w-64"
          />
          <SelectFilter label="City" options={cities} value={filterCity} onChange={setFilterCity} />
          <SelectFilter label="Region" options={regions} value={filterRegion} onChange={setFilterRegion} />
          <SelectFilter label="Skill" options={skills} value={filterSkill} onChange={setFilterSkill} />
        </div>

        {/* Hackers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackers.map(h => (
            <div key={h.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col space-y-3 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <img src={h.avatar} className="w-16 h-16 rounded-full border-2 border-indigo-500" />
                <div>
                  <p className="text-white font-bold">{h.name}</p>
                  <p className="text-zinc-400 text-sm">{h.skills}</p>
                </div>
                <FaCircle className={`ml-auto ${h.status === "active" ? "text-green-400" : "text-zinc-500"}`} />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-zinc-400 text-xs">
                <span className="flex items-center gap-1"><FaMapMarkerAlt /> {h.city}</span>
                <span className="flex items-center gap-1">Region: {h.region}</span>
                <span className="flex items-center gap-1"><FaStar /> {h.points} pts</span>
                <span className="flex items-center gap-1">Flow: {h.flowScore}</span>
              </div>
              <button
                onClick={() => sendRequest(h.id)}
                disabled={h.requestSent}
                className={`mt-2 flex items-center justify-center gap-2 w-full text-sm px-3 py-1 rounded-full ${
                  h.requestSent
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600"
                } text-white`}
              >
                <FaPaperPlane /> {h.requestSent ? "Request Sent" : "Send Collab Request"}
              </button>
              <button className="mt-1 bg-indigo-700 hover:bg-indigo-800 text-white px-3 py-1 rounded-full text-sm">
                View Profile
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {filteredHackers.length === 0 && (
          <div className="text-center text-zinc-500 py-10">
            No hackers found for the selected filters.
          </div>
        )}
      </div>
    </main>
  );
}

/* ---------------- Components ---------------- */

function SelectFilter({ label, options, value, onChange }) {
  return (
    <div>
      <label className="text-zinc-400 text-xs">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="ml-2 p-2 rounded bg-zinc-800 text-white"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
