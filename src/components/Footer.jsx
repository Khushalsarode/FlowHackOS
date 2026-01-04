export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* BRAND */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">HackFLOW</h3>
          <p className="text-sm text-zinc-500">
            Built for hackers. Powered by collaboration.
          </p>
        </div>

        {/* LINKS */}
        <div className="flex gap-6 text-sm text-zinc-400">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Features</a>
          <a href="#" className="hover:text-white transition">Contact</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
        </div>

        {/* COPYRIGHT */}
        <div className="text-xs text-zinc-500 text-center">
          © {new Date().getFullYear()} HackFLOW. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
