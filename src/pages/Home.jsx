import LoginButton from "../auth/LoginButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
        <span className="inline-flex items-center gap-2 mb-4 rounded-full bg-indigo-500/10 px-4 py-1 text-sm text-indigo-400 border border-indigo-500/20">

          {/* LIVE DOT */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>

          Live ·  The Hacker Momentum Engine
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Hackathons don’t fail <br />
          <span className="text-indigo-400">Hackers lose momentum.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
          HackFLOW OS detects when you’re stuck, overthinking, or overengineering —
          and actively pushes you back into flow using AI, voice, and execution sprints.
        </p>

        <div className="mt-10 flex justify-center">
          <LoginButton label="Enter HackFLOW OS →" />
        </div>
      </section>

      {/* CORE MODULES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          How HackFLOW Keeps You Shipping
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="🧠 Flow Engine"
            desc="AI detects when you’re stuck, scope-creeping, or overthinking — and gives you a clear next action."
          />
          <Card
            title="⏱️ Momentum Mode"
            desc="25-minute forced build sprint. No new ideas. No distractions. Just execution."
          />
          <Card
            title="📊 Momentum Score"
            desc="Visual flow rings track your progress and reward consistency during the hackathon."
          />
        </div>
      </section>

      {/* DEMO + VOICE WOW */}
      <section className="bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Demo Like Your Project Depends On It
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto mb-10">
            HackFLOW’s Demo Arena simulates impatient judges, confused sponsors,
            and brutal interruptions — with live AI voice feedback.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="🎭 Judge Simulator"
              desc="AI judges interrupt, question, and get bored — just like real demos."
            />
            <Card
              title="🎙️ Voice Feedback"
              desc="Real-time spoken feedback powered by ElevenLabs."
            />
            <Card
              title="🔴 Boredom Meter"
              desc="If the meter hits red, AI rewrites your demo script instantly."
            />
          </div>
        </div>
      </section>

      {/* HACKMAP + TEAMS */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">
          You’re Not Hacking Alone
        </h2>
        <p className="text-zinc-400 max-w-3xl mx-auto mb-10">
          Discover hackers on a live map, see who’s in flow, who’s stuck,
          and form teams that actually ship.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            title="🗺️ HackMap"
            desc="Visual map of hackers by location, skills, and flow state."
          />
          <Card
            title="👥 Team Flow"
            desc="Team momentum score = average flow of members. Simple. Brutal. Effective."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stop Planning. Start Shipping.
          </h2>
          <p className="text-zinc-400 mb-8">
            HackFLOW doesn’t help you think more — it helps you finish.
          </p>
          <LoginButton label="Start My Flow Session →" />
        </div>
      </section>
    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-indigo-500/40 transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{desc}</p>
    </div>
  );
}
