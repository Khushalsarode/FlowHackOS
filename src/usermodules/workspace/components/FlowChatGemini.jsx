// src/usermodules/workspace/components/FlowChatGemini.jsx
import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaUser, FaRobot } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub-flavored markdown

export default function FlowChatGemini({ apiKey }) {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem("chat_history");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const scrollRef = useRef();

  const genAI = new GoogleGenerativeAI(apiKey);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const sendPrompt = async (prompt = null) => {
    const text = prompt || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChatHistory((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    const aiPlaceholder = {
      sender: "ai",
      text: "Typing...",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChatHistory((prev) => [...prev, aiPlaceholder]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(text);
      const aiText = await result.response.text();

      setChatHistory((prev) =>
        prev.map((msg) => (msg === aiPlaceholder ? { ...aiPlaceholder, text: aiText } : msg))
      );
      setExpandedIndex(chatHistory.length);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) =>
        prev.map((msg) =>
          msg === aiPlaceholder ? { ...aiPlaceholder, text: "Error: could not fetch AI response" } : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendPrompt();
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("chat_history");
    setExpandedIndex(null);
  };

  const suggestedPrompts = [
    "Summarize my idea",
    "Give improvement suggestions",
    "Detect risks",
    "Generate next steps",
  ];

  return (
    <div className="flex flex-col h-[600px] bg-zinc-800 rounded-xl shadow-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-2">Flow AI Chat</h3>

      {/* Suggested prompts */}
      <div className="flex flex-wrap gap-2 mb-2">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => sendPrompt(prompt)}
            className="bg-zinc-700 hover:bg-indigo-600 text-white px-3 py-1 rounded text-sm"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 border border-zinc-700 rounded mb-2">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            {msg.sender === "user" && (
              <div className="flex items-start gap-2 cursor-pointer">
                <FaUser className="text-indigo-400 mt-1" />
                <div className="bg-indigo-600 text-white px-3 py-2 rounded-lg max-w-xl break-words">
                  <div className="text-sm text-zinc-400 mb-1">{msg.time}</div>
                  {msg.text}
                </div>
              </div>
            )}

            {msg.sender === "ai" && (
              <div
                className="flex items-start gap-2 ml-6 mt-1 cursor-pointer"
                onClick={() => setExpandedIndex(idx === expandedIndex ? null : idx)}
              >
                <FaRobot className="text-green-400 mt-1" />
                <div className="bg-zinc-700 text-white px-3 py-2 rounded-lg max-w-xl break-words prose prose-invert">
                  <div className="text-sm text-zinc-400 mb-1">{msg.time}</div>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input & buttons */}
      <div className="flex gap-2 mt-auto">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Gemini AI..."
          className="flex-1 p-2 rounded bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none"
        />
        <button
          onClick={sendPrompt}
          disabled={loading || !inputValue.trim()}
          className="bg-indigo-600 px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
        <button onClick={clearHistory} className="bg-red-600 px-4 py-2 rounded">
          🗑️
        </button>
      </div>
    </div>
  );
}
