export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold tracking-tight text-white">
              HackFLOW
            </h3>
            <p className="text-sm text-zinc-500">
              The momentum engine for hackers — helping teams ship faster,
              demo better, and finish strong.
            </p>

            {/* LIVE STATUS */}
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              </span>
              Product live & operational
            </div>
          </div>

          {/* PRODUCT */}
          <div className="space-y-3 text-sm text-zinc-400">
            <h4 className="text-white font-medium">Product</h4>
            <a href="#" className="block hover:text-white transition">Features</a>
            <a href="#" className="block hover:text-white transition">How it Works</a>
            <a href="#" className="block hover:text-white transition">HackMap</a>
            <a href="#" className="block hover:text-white transition">Demo Arena</a>
          </div>

          {/* COMMUNITY */}
          <div className="space-y-3 text-sm text-zinc-400">
            <h4 className="text-white font-medium">Community</h4>
            <a href="#" className="block hover:text-white transition">Community Hub</a>
            <a href="#" className="block hover:text-white transition">Blog</a>
            <a href="#" className="block hover:text-white transition">Events</a>
            <a href="#" className="block hover:text-white transition">Contact</a>
          </div>

          {/* STAY UPDATED */}
          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm">Stay Updated</h4>
            <p className="text-sm text-zinc-500">
              Get product updates, hackathon tips, and launch news.
            </p>

            {/* EMAIL (UI ONLY FOR NOW) */}
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="you@hackathon.dev"
                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 transition"
              >
                Join
              </button>
            </div>

            <p className="text-xs text-zinc-500">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 border-t border-zinc-800" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <span>
            © {new Date().getFullYear()} HackFLOW. All rights reserved.
          </span>

          <span className="flex items-center gap-1">
            Built with <span className="text-red-400">♥</span> for hackathons
          </span>
        </div>
      </div>
    </footer>
  );
}
