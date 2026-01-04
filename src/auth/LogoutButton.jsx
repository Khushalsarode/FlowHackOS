import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="
        inline-flex items-center justify-center
        px-4 py-2 rounded-lg
        text-sm font-medium
        text-zinc-300
        border border-zinc-700
        bg-zinc-900/60
        hover:bg-zinc-800 hover:text-white
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-zinc-600
      "
    >
      Log out
    </button>
  );
}
