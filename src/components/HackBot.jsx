import { useState } from "react";

export default function HackBot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-indigo-500 p-4 shadow-xl hover:bg-indigo-400 transition"
      >
        🤖
      </button>

      {/* BOT PANEL */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <span className="text-white font-medium">HackFLOW Bot</span>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="p-4 space-y-3 text-sm">
            <button className="w-full rounded-lg bg-zinc-800 p-2 hover:bg-zinc-700 transition">
              🚧 I’m stuck
            </button>
            <button className="w-full rounded-lg bg-zinc-800 p-2 hover:bg-zinc-700 transition">
              🧠 Help me decide
            </button>
            <button className="w-full rounded-lg bg-zinc-800 p-2 hover:bg-zinc-700 transition">
              ⏱ Start momentum mode
            </button>
            <button className="w-full rounded-lg bg-zinc-800 p-2 hover:bg-zinc-700 transition">
              🎤 Practice demo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
