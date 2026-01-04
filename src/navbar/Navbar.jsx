import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Brand */}
          <Link to="/" className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-white tracking-wide">
              Hack<span className="text-indigo-400">FLOW</span>
            </span>
            <span className="text-xs text-zinc-400">
              Build • Collaborate • Ship • Grow
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {!isAuthenticated ? (
              <>
                 <NavItem label="Home" to="/" active={location.pathname === "/"} />
                <NavItem label="Features" to="/features" active={location.pathname === "/features"} />
                <NavItem label="How it Works" to="/how-it-works" active={location.pathname === "/how-it-works"} />
                <NavItem label="Community" to="/community" active={location.pathname === "/community"} />
                <NavItem label="About" to="/about" active={location.pathname === "/about"} />
              </>
            ) : (
              <>
                <NavItem label="Dashboard" to="/dashboard" active={location.pathname === "/dashboard"} />
                <NavItem label="Station" to="/station" active={location.pathname === "/station"} />
                <NavItem label="HackMap" to="/hackmap" active={location.pathname === "/hackmap"} />
                <NavItem label="Teams" to="/teams" active={location.pathname === "/teams"} />
                <NavItem label="Events" to="/events" active={location.pathname === "/events"} />
                <NavItem label="Blog" to="/blog" active={location.pathname === "/blog"} />
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="relative flex items-center gap-4">
            {!isAuthenticated ? (
              <LoginButton />
            ) : (
              <>
                {/* Avatar */}
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="relative h-9 w-9 rounded-full overflow-hidden border border-zinc-700
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <img
                    src={user?.picture}
                    alt="profile"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 top-12 w-44 rounded-xl border border-zinc-800
                               bg-zinc-900 shadow-xl overflow-hidden animate-dropdown"
                  >
                    <DropdownLink to="/profile" onClick={() => setDropdownOpen(false)}>
                      Profile
                    </DropdownLink>

                    <DropdownLink to="/settings" onClick={() => setDropdownOpen(false)}>
                      Settings
                    </DropdownLink>

                    <DropdownLink to="/notifications" onClick={() => setDropdownOpen(false)}>
                      Notifications
                    </DropdownLink>

                    <div className="border-t border-zinc-800 my-1" />
                    <LogoutButton />
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

/* ---------- Reusable Components ---------- */

function NavItem({ label, to, active }) {
  const base =
    "transition-colors duration-200 hover:text-white";
  const activeClass = active
    ? "text-white"
    : "text-zinc-400";

  return to ? (
    <Link to={to} className={`${base} ${activeClass}`}>
      {label}
    </Link>
  ) : (
    <button className={`${base} text-zinc-400`}>
      {label}
    </button>
  );
}

function DropdownLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
