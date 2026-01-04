// DemoArena.jsx
import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { FaPlay } from "react-icons/fa";

export default function DemoArena({
  workspaceIdea,
  geminiApiKey,
  elevenLabsKey,
  elevenVoiceId
}) {
  const [score, setScore] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newLink, setNewLink] = useState(""); // dynamic link input

  const elevenClient = new ElevenLabsClient({
    apiKey: elevenLabsKey || import.meta.env.VITE_ELEVEN_LABS_KEY,
    environment: "https://api.elevenlabs.io",
  });

  const genAI = new GoogleGenerativeAI(geminiApiKey || import.meta.env.VITE_GEMINI_KEY);

  const scrollRef = useRef();

  // Run random demo
  const runDemo = () => {
    const randomScore = Math.floor(Math.random() * 100) + 1;
    setScore(randomScore);
    setHistory(prev => [...prev, { type: "manual", score: randomScore, time: new Date() }]);
  };

  // Run AI demo
  const runAIDemo = async () => {
    if (!workspaceIdea?.description) return;
    setLoading(true);
    const placeholder = { type: "ai", score: null, time: new Date(), text: "Calculating..." };
    setHistory(prev => [...prev, placeholder]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Evaluate the project below and suggest a score from 0 to 100 with reasoning.\nProject Description:\n${workspaceIdea.description}`;
      const result = await model.generateContent(prompt);
      const aiText = await result.response.text();

      let suggestedScore = null;
      const match = aiText.match(/\b([0-9]{1,3})\b/);
      if (match) suggestedScore = Math.min(100, parseInt(match[1]));

      setHistory(prev => prev.map(h => h === placeholder ? { ...placeholder, score: suggestedScore, text: aiText } : h));
      setScore(suggestedScore);

      if (elevenVoiceId) await speakText(aiText);
    } catch (err) {
      console.error("AI Demo error:", err);
      setHistory(prev => prev.map(h => h === placeholder ? { ...placeholder, text: "Error fetching AI score" } : h));
    } finally {
      setLoading(false);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ElevenLabs TTS
  const speakText = async (text) => {
    if (!elevenVoiceId) return;
    try {
      const result = await elevenClient.textToSpeech.convert(elevenVoiceId, {
        text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128",
      });
      const arrayBuffer = await result.arrayBuffer();
      const audioUrl = URL.createObjectURL(new Blob([arrayBuffer], { type: "audio/mpeg" }));
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (err) {
      console.error("ElevenLabs TTS error:", err);
    }
  };

  // Add user link dynamically
  const addLink = () => {
    if (!newLink.trim()) return;
    setHistory(prev => [...prev, { type: "link", url: newLink.trim(), time: new Date() }]);
    setNewLink("");
  };

  // Reset history
  const resetHistory = () => {
    setHistory([]);
    setScore(null);
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg mt-6">
      <h2 className="text-white font-semibold mb-2">Demo Arena</h2>
      <p className="text-zinc-300 mb-2">Project: {workspaceIdea?.title}</p>

      {/* Buttons */}
      <div className="flex gap-2 mb-2 flex-wrap">
        <button onClick={runDemo} className="bg-indigo-500 text-white px-3 py-1 rounded">
          Run Random Demo
        </button>
        <button onClick={runAIDemo} disabled={loading} className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50">
          {loading ? "AI Running..." : "AI Demo"}
        </button>
        <button onClick={resetHistory} className="bg-red-600 text-white px-3 py-1 rounded">
          Reset
        </button>
      </div>

      {/* Current Score */}
      {score !== null && (
        <div className="mb-2">
          <p className="text-zinc-300">Score: {score}/100</p>
          <div className="w-full bg-zinc-700 h-2 rounded">
            <div className="bg-indigo-500 h-2 rounded" style={{ width: `${score}%` }}></div>
          </div>
        </div>
      )}

      {/* Add dynamic link */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Add YouTube / project link..."
          value={newLink}
          onChange={e => setNewLink(e.target.value)}
          className="flex-1 p-2 rounded bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none"
        />
        <button onClick={addLink} className="bg-indigo-500 text-white px-3 py-1 rounded">
          Add Link
        </button>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-4 max-h-64 overflow-y-auto border border-zinc-700 rounded p-2">
          {history.map((h, idx) => (
            <div key={idx} className="mb-2">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm">
                  {h.type === "manual" ? "Manual" : h.type === "ai" ? "AI" : "Link"} - {h.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                {h.type === "ai" && h.text && elevenVoiceId && (
                  <button onClick={() => speakText(h.text)} className="text-green-300 hover:text-green-400">
                    <FaPlay />
                  </button>
                )}
              </div>
              {h.type === "manual" && <p className="text-zinc-300">Score: {h.score}/100</p>}
              {h.type === "ai" && (
                <>
                  <p className="text-zinc-300">Score: {h.score !== null ? `${h.score}/100` : "--"}</p>
                  <p className="text-zinc-400 text-sm">{h.text}</p>
                </>
              )}
              {h.type === "link" && (
                <p className="text-indigo-400">
                  <a href={h.url} target="_blank" rel="noopener noreferrer">{h.url}</a>
                </p>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      )}
    </div>
  );
}
