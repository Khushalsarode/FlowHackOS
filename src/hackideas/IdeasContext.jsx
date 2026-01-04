import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const IdeasContext = createContext();
export const useIdeas = () => useContext(IdeasContext);

export const IdeasProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [ideas, setIdeas] = useState([]);
  const [activeIdeaId, setActiveIdeaId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Workspace idea persisted in localStorage
  const [workspaceIdea, setWorkspaceIdeaState] = useState(() => {
    const saved = localStorage.getItem("workspaceIdea");
    return saved ? JSON.parse(saved) : null;
  });

  const setWorkspaceIdea = (idea) => {
    setWorkspaceIdeaState(idea);
    if (idea) {
      localStorage.setItem("workspaceIdea", JSON.stringify(idea));
    } else {
      localStorage.removeItem("workspaceIdea");
    }
  };

  // Fetch ideas for current user
  useEffect(() => {
    if (!isAuthenticated || !user?.sub) return;
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/ideas/${user.sub}`);
        const data = await res.json();
        setIdeas(data);
      } catch (err) {
        console.error("Fetch ideas error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, [isAuthenticated, user]);

  // Add idea
  const addIdea = async (title, shortDesc, fullDesc) => {
    try {
      const res = await fetch("http://localhost:5000/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, shortDesc, fullDesc, user }),
      });
      if (!res.ok) throw new Error("Add idea failed");
      const newIdea = await res.json();
      setIdeas((prev) => [newIdea, ...prev]);
      setActiveIdeaId(newIdea._id);
    } catch (err) {
      console.error("Add idea error:", err);
    }
  };

  // Update idea
  const updateIdea = async (id, title, shortDesc, fullDesc, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/ideas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, shortDesc, fullDesc, status, userId: user.sub }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updatedIdea = await res.json();
      setIdeas((prev) => prev.map((i) => (i._id === id ? updatedIdea : i)));

      // Update workspaceIdea if it matches the updated one
      if (workspaceIdea?._id === id) setWorkspaceIdea(updatedIdea);
    } catch (err) {
      console.error("Update idea error:", err);
    }
  };

  // Delete idea
  const deleteIdea = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/ideas/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.sub }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setIdeas((prev) => prev.filter((i) => i._id !== id));
      if (activeIdeaId === id) setActiveIdeaId(null);
      if (workspaceIdea?._id === id) setWorkspaceIdea(null);
    } catch (err) {
      console.error("Delete idea error:", err);
    }
  };

  return (
    <IdeasContext.Provider
      value={{
        ideas,
        loading,
        activeIdeaId,
        setActiveIdeaId,
        addIdea,
        updateIdea,
        deleteIdea,
        workspaceIdea,
        setWorkspaceIdea, // persisted
      }}
    >
      {!isLoading && children}
    </IdeasContext.Provider>
  );
};
