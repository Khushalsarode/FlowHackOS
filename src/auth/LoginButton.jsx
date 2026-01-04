import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton({ label = "Sign in" }) {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="
        w-full inline-flex items-center justify-center
        px-6 py-3 rounded-xl
        bg-indigo-500 text-white font-semibold
        tracking-wide
        shadow-lg shadow-indigo-500/20
        hover:bg-indigo-400 hover:shadow-indigo-400/30
        active:scale-[0.98]
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-indigo-400/60
      "
    >
      {label}
    </button>
  );
}
