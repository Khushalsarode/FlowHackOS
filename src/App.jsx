import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./auth/navbar/Navbar";
import Profile from "./auth/Profile";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Footer from "./components/Footer";

//pop ups for whole app can be added here
import HackBot from "./components/HackBot";
import BackToTop from "./components/BackToTop";
export default function App() {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400">
        <span className="text-lg animate-pulse">
          Initializing <span className="text-indigo-400 font-semibold">HackFLOW</span>…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="bg-red-900/30 border border-red-700 rounded-xl p-8 max-w-md text-center">
          <h1 className="text-2xl font-semibold text-red-400 mb-2">
            Authentication Error
          </h1>
          <p className="text-sm text-red-300/80">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
        <Navbar />

        {/* Pages render here */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
      </div>
      {/* GLOBAL OVERLAYS */}
      <div id="overlays">
        <BackToTop />
        <HackBot />
      </div>
    </BrowserRouter>
  );
}
