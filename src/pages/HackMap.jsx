import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import { FaCircle, FaStar } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

// Dummy Indian hacker data
const dummyHackers = [
  { id: "h1", name: "Aarav Singh", city: "Mumbai", lat: 19.076, lng: 72.8777, skills: "React", points: 120, flowScore: 80, status: "active" },
  { id: "h2", name: "Diya Sharma", city: "Delhi", lat: 28.6139, lng: 77.209, skills: "AI", points: 150, flowScore: 90, status: "active" },
  { id: "h3", name: "Rohan Gupta", city: "Bengaluru", lat: 12.9716, lng: 77.5946, skills: "Node.js", points: 95, flowScore: 60, status: "idle" },
  { id: "h4", name: "Anika Patel", city: "Kolkata", lat: 22.5726, lng: 88.3639, skills: "Python", points: 110, flowScore: 75, status: "active" },
  { id: "h5", name: "Kabir Khan", city: "Chennai", lat: 13.0827, lng: 80.2707, skills: "Blockchain", points: 130, flowScore: 85, status: "active" },
  { id: "h6", name: "Meera Joshi", city: "Hyderabad", lat: 17.385, lng: 78.4867, skills: "Design", points: 70, flowScore: 50, status: "idle" },
  { id: "h7", name: "Arjun Mehta", city: "Pune", lat: 18.5204, lng: 73.8567, skills: "AI", points: 140, flowScore: 92, status: "active" },
  { id: "h8", name: "Sneha Reddy", city: "Jalgaon", lat: 21.007, lng: 75.563, skills: "React", points: 85, flowScore: 65, status: "idle" },
  { id: "h9", name: "Vikram Desai", city: "Nagpur", lat: 21.1458, lng: 79.0882, skills: "Python", points: 100, flowScore: 70, status: "active" },
  { id: "h10", name: "Isha Kapoor", city: "Nashik", lat: 19.9975, lng: 73.7898, skills: "Node.js", points: 95, flowScore: 68, status: "active" },
  { id: "h11", name: "Tanvi Sharma", city: "Aurangabad", lat: 19.8762, lng: 75.3433, skills: "AI", points: 120, flowScore: 82, status: "active" },
  { id: "h12", name: "Raghav Joshi", city: "Thane", lat: 19.2183, lng: 72.9781, skills: "Blockchain", points: 110, flowScore: 78, status: "idle" },
  { id: "h13", name: "Neha Patil", city: "Kolhapur", lat: 16.705, lng: 74.2433, skills: "Design", points: 90, flowScore: 60, status: "active" },
  { id: "h14", name: "Kunal Sharma", city: "Mumbai", lat: 19.091, lng: 72.865, skills: "React", points: 135, flowScore: 88, status: "active" },
  { id: "h15", name: "Priya Verma", city: "Pune", lat: 18.5167, lng: 73.8567, skills: "Python", points: 105, flowScore: 72, status: "active" },
  { id: "h16", name: "Aditya Rane", city: "Jalgaon", lat: 21.0075, lng: 75.5635, skills: "Node.js", points: 95, flowScore: 65, status: "idle" },
  { id: "h17", name: "Sanya Kulkarni", city: "Mumbai", lat: 19.096, lng: 72.876, skills: "AI", points: 150, flowScore: 95, status: "active" },
  { id: "h18", name: "Ritesh Patil", city: "Pune", lat: 18.521, lng: 73.855, skills: "Blockchain", points: 125, flowScore: 85, status: "active" },
  { id: "h19", name: "Tanya Singh", city: "Nagpur", lat: 21.145, lng: 79.087, skills: "Design", points: 80, flowScore: 60, status: "idle" },
  { id: "h20", name: "Manish Sharma", city: "Aurangabad", lat: 19.875, lng: 75.344, skills: "React", points: 130, flowScore: 88, status: "active" },
];

export default function HackMap() {
  const [cityFilter, setCityFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");

  const cities = ["All", ...new Set(dummyHackers.map(h => h.city))];
  const skills = ["All", ...new Set(dummyHackers.map(h => h.skills))];

  const filteredHackers = dummyHackers.filter(h => 
    (cityFilter === "All" || h.city === cityFilter) &&
    (skillFilter === "All" || h.skills === skillFilter)
  );

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 px-4">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">HackMap - India</h1>
          <p className="text-zinc-400">See where hackers are active across Indian cities.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <SelectFilter label="City" options={cities} value={cityFilter} onChange={setCityFilter} />
          <SelectFilter label="Skill" options={skills} value={skillFilter} onChange={setSkillFilter} />
        </div>

        {/* Map */}
        <div className="h-[600px] rounded-2xl overflow-hidden border border-zinc-800 shadow-lg mt-4">
          <MapContainer center={[20.5937, 78.9629]} zoom={5} className="w-full h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {filteredHackers.map(h => (
              <CircleMarker
                key={h.id}
                center={[h.lat, h.lng]}
                radius={10}
                color={h.status === "active" ? "limegreen" : "gray"}
                fillOpacity={0.7}
              >
                <Popup className="bg-zinc-900 text-white p-3 rounded-xl border border-zinc-800">
                  <p className="font-bold">{h.name}</p>
                  <p className="text-xs text-zinc-400">{h.city}</p>
                  <p className="text-xs text-zinc-400">Skill: {h.skills}</p>
                  <p className="text-xs text-zinc-400">Flow Score: {h.flowScore}</p>
                  <p className="text-xs text-zinc-400">Points: {h.points} <FaStar className="inline text-yellow-400" /></p>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

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
