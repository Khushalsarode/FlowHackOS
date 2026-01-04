import { useState, useRef, useEffect } from "react";
import { useIdeas } from "../../hackideas/IdeasContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaUser, FaRobot, FaPlay } from "react-icons/fa";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export default function ScopeKiller({ apiKey, ideaId, elevenLabsKey, elevenVoiceId }) {
  const { ideas } = useIdeas();
  const idea = ideas.find(i => i._id === ideaId);
  const genAI = new GoogleGenerativeAI(apiKey || import.meta.env.VITE_GEMINI_KEY);
  const scrollRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [useIdeaData, setUseIdeaData] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedModes, setSelectedModes] = useState(["Roast"]);

  const modes = [
    { name: "Roast", description: "Humorous AI comments" },
    { name: "Plain Text", description: "Simple analysis without flair" },
    { name: "Detailed", description: "In-depth analysis" },
    { name: "Help", description: "Suggestions and guidance" },
    { name: "Strategy", description: "Strategic planning insights" },
  ];

  const toggleMode = (mode) => {
    setSelectedModes(prev =>
      prev.includes(mode)
        ? prev.filter(m => m !== mode)
        : [...prev, mode]
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const getCardColor = (classification) => {
    const map = { kill: "bg-red-700", later: "bg-yellow-700", ship: "bg-green-700" };
    if (!classification) return "bg-zinc-700";
    const key = Object.keys(map).find(k => classification.toLowerCase().includes(k));
    return map[key] || "bg-zinc-700";
  };

  // Function to speak AI text using ElevenLabs
  const speakText = async (text) => {
    if (!elevenVoiceId) {
      console.warn("No ElevenLabs voice ID provided!");
      return;
    }

    try {
      const elevenClient = new ElevenLabsClient({
        apiKey: elevenLabsKey || import.meta.env.VITE_ELEVEN_LABS_KEY,
        environment: "https://api.elevenlabs.io",
      });
      const voicekey = elevenVoiceId || import.meta.env.VITE_ELEVEN_VOICE_ID;
      const result = await elevenClient.textToSpeech.convert(voicekey, {
        text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128",
      });

      // Convert to arrayBuffer -> Blob -> Audio
      const arrayBuffer = await result.arrayBuffer();
      const audioUrl = URL.createObjectURL(new Blob([arrayBuffer], { type: "audio/mpeg" }));
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (err) {
      console.error("ElevenLabs TTS error:", err);
    }
  };

  const sendPrompt = async () => {
    const content = useIdeaData
      ? [...(idea?.features || []), ...(idea?.description ? [idea.description] : []), ...(idea?.goals || [])]
      : inputValue.split("\n").map(f => f.trim()).filter(Boolean);

    if (!content.length || selectedModes.length === 0) return;

    const userMsg = {
      sender: "user",
      text: content.join("\n"),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChatHistory(prev => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    const aiPlaceholder = { sender: "ai", text: "Typing...", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setChatHistory(prev => [...prev, aiPlaceholder]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Analyze in modes "${selectedModes.join(", ")}" and respond in JSON [{"feature":"...","classification":"...","comment":"..."}]\nContent:\n${content.join("\n")}`;
      const result = await model.generateContent(prompt);
      const aiText = await result.response.text();

      let parsed;
      try { parsed = JSON.parse(aiText); } catch { parsed = null; }

      const aiMessages = parsed?.map
        ? parsed.map(item => ({
            sender: "ai",
            text: `${item.feature} → ${item.classification}\n${item.comment}`,
            classification: item.classification,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }))
        : [{ ...aiPlaceholder, text: aiText }];

      setChatHistory(prev => [...prev.filter(msg => msg !== aiPlaceholder), ...aiMessages]);

      // Auto-play first AI message
      if (aiMessages[0]) speakText(aiMessages[0].text);

    } catch (err) {
      console.error(err);
      setChatHistory(prev => prev.map(msg => msg === aiPlaceholder ? { ...aiPlaceholder, text: "Error fetching AI response" } : msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-zinc-900 rounded-xl shadow-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-2">Scope Killer Gemini</h3>

      {/* Use Idea Checkbox */}
      <label className="flex items-center gap-2 text-white mb-2">
        <input type="checkbox" checked={useIdeaData} onChange={() => setUseIdeaData(!useIdeaData)} className="accent-red-600" />
        Use idea content
      </label>

      {/* Modes Checkboxes */}
      <div className="mb-4 text-white">
        <p className="font-semibold mb-1">Select Modes:</p>
        <div className="flex flex-col gap-1">
          {modes.map(({ name, description }) => (
            <label key={name} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedModes.includes(name)}
                onChange={() => toggleMode(name)}
                className="accent-indigo-500"
              />
              <span>{name}</span>
              {description && <span className="text-zinc-400 text-sm">({description})</span>}
            </label>
          ))}
        </div>
      </div>

      {/* Manual input */}
      {!useIdeaData && (
        <textarea
          placeholder="Enter content, one per line..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendPrompt()}
          className="w-full p-2 mb-2 rounded bg-zinc-800 text-white"
        />
      )}

      {/* Chat */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 border border-zinc-700 rounded mb-2">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex items-start gap-2 ${msg.sender === "ai" ? "ml-6" : ""}`}>
            {msg.sender === "user" ? <FaUser className="text-indigo-400 mt-1" /> : <FaRobot className="text-green-400 mt-1" />}
            <div className={`px-3 py-2 rounded-lg max-w-xl break-words whitespace-pre-wrap ${msg.sender === "ai" ? getCardColor(msg.classification) : "bg-indigo-600 text-white"}`}>
              <div className="flex justify-between items-center">
                <div className="text-sm text-zinc-400 mb-1">{msg.time}</div>
                {msg.sender === "ai" && (
                  <button onClick={() => speakText(msg.text)} className="ml-2 text-green-300 hover:text-green-400">
                    <FaPlay />
                  </button>
                )}
              </div>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input & actions */}
      <div className="flex gap-2 mt-auto">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendPrompt()}
          placeholder="Ask Gemini AI..."
          className="flex-1 p-2 rounded bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none"
        />
        <button onClick={sendPrompt} disabled={loading || (!inputValue.trim() && !useIdeaData)} className="bg-indigo-600 px-4 py-2 rounded disabled:opacity-50">
          {loading ? "Thinking..." : "Send"}
        </button>
        <button onClick={() => setChatHistory([])} className="bg-red-600 px-4 py-2 rounded">🗑️</button>
      </div>
    </div>
  );
}
