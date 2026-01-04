// src/usermodules/workspace/components/ScopeKiller.jsx
import { useState, useEffect, useRef } from "react";
import { useIdeas } from "../../../hackideas/IdeasContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import axios from "axios";

export default function ScopeKiller({ apiKey }) {
  const { workspaceIdea } = useIdeas();

  const [features, setFeatures] = useState([]);
  const [userFeature, setUserFeature] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roastMode, setRoastMode] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const scrollRef = useRef();

  const genAI = new GoogleGenerativeAI(apiKey || import.meta.env.VITE_GEMINI_KEY);

  // Load workspace features on mount
  useEffect(() => {
    if (workspaceIdea?.features?.length) {
      setFeatures([...workspaceIdea.features]);
    }
  }, [workspaceIdea]);

  // Scroll to latest result
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [results]);

  // Add feature manually
  const addFeature = () => {
    const trimmed = userFeature.trim();
    if (!trimmed) return;

    // Avoid duplicates
    if (features.includes(trimmed)) {
      alert("Feature already added!");
      return;
    }

    setFeatures((prev) => [...prev, trimmed]);
    setUserFeature("");
  };

  // Remove feature
  const removeFeature = (idx) => setFeatures((prev) => prev.filter((_, i) => i !== idx));

  // AI Classification
  const classifyFeatures = async () => {
    if (!features.length) return alert("Add some features first!");
    setLoading(true);
    setResults([]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
Classify these features into:
❌ Kill (remove)
⚠️ Later (defer)
✅ Ship (keep)

Features:
${features.map((f, i) => `${i + 1}. ${f}`).join("\n")}

${roastMode ? "Use a sarcastic, humorous tone!" : ""}
Respond as JSON array: [{"feature": "...", "classification": "...", "comment": "..."}]
      `;

      const response = await model.generateContent(prompt);
      const text = await response.response.text();

      let classified;
      try {
        classified = JSON.parse(text);
      } catch (err) {
        console.error("Parsing error:", err);
        classified = [{ feature: "Error", classification: "❌", comment: text }];
      }

      setResults(classified);

      // Save to backend
      await axios.post("/api/scope-analysis", {
        ideaId: workspaceIdea?._id,
        features: classified,
        roastMode,
        createdAt: new Date(),
      });
    } catch (err) {
      console.error(err);
      alert("Failed to classify features.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => e.key === "Enter" && addFeature();

  return (
    <div className="bg-zinc-800 rounded-xl p-4 shadow-lg w-full flex flex-col">
      <h2 className="text-white font-semibold text-lg mb-2">Scope Killer</h2>

      {/* Feature Input */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={userFeature}
          onChange={(e) => setUserFeature(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Add a new feature..."
          className="flex-1 p-2 rounded bg-zinc-700 text-white placeholder-zinc-400"
        />
        <button onClick={addFeature} className="bg-indigo-600 px-4 py-2 rounded text-white">
          Add
        </button>
      </div>

      {/* Feature List */}
      <div className="mb-2 space-y-1 max-h-32 overflow-y-auto">
        {features.length === 0 && <p className="text-zinc-400 text-sm">No features yet.</p>}
        {features.map((f, idx) => (
          <div key={idx} className="flex justify-between items-center bg-zinc-700 text-white px-3 py-1 rounded">
            <span>{f}</span>
            <button onClick={() => removeFeature(idx)} className="text-red-400 font-bold">
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Roast Mode Toggle */}
      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={roastMode}
          onChange={() => setRoastMode(!roastMode)}
          id="roastMode"
        />
        <label htmlFor="roastMode" className="text-white text-sm">
          Roast Mode (Humorous AI comments)
        </label>
      </div>

      {/* Run Classification */}
      <button
        onClick={classifyFeatures}
        disabled={loading || !features.length}
        className="bg-green-600 px-4 py-2 rounded text-white mb-2 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Run Scope Killer"}
      </button>

      {/* Results */}
      <div className="flex-1 overflow-y-auto space-y-2 mt-2 max-h-96">
        {results.map((res, idx) => (
          <div
            key={idx}
            className="bg-zinc-700 p-2 rounded cursor-pointer"
            onClick={() => setExpandedIndex(idx === expandedIndex ? null : idx)}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{res.feature}</span>
              <span
                className={`font-bold ${
                  res.classification === "❌" ? "text-red-400" :
                  res.classification === "⚠️" ? "text-yellow-400" :
                  "text-green-400"
                }`}
              >
                {res.classification}
              </span>
            </div>
            {expandedIndex === idx && (
              <div className="mt-1 text-white text-sm">
                <ReactMarkdown>{res.comment}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
    </div>
  );
}
