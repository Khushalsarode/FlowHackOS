import { useState } from "react";
import { useIdeas } from "./IdeasContext";

export default function AddIdea() {
  const { addIdea } = useIdeas();
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!shortDesc.trim()) newErrors.shortDesc = "Short description is required";
    if (!fullDesc.trim()) newErrors.fullDesc = "Full description is required";
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    addIdea(title, shortDesc, fullDesc);
    setTitle(""); setShortDesc(""); setFullDesc(""); setErrors({});
  };

  return (
    <div className="flex justify-center items-start py-12 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-zinc-900 rounded-2xl shadow-2xl p-8 space-y-6 border border-zinc-700"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-4">Add Your Hack Idea</h2>
        <input
          placeholder="Idea Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-3 rounded-lg bg-zinc-800 text-white border ${errors.title ? "border-red-500" : "border-zinc-700"} focus:ring-2 focus:ring-indigo-500`}
        />
        <input
          placeholder="Short Description"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          className={`w-full p-3 rounded-lg bg-zinc-800 text-white border ${errors.shortDesc ? "border-red-500" : "border-zinc-700"} focus:ring-2 focus:ring-indigo-500`}
        />
        <textarea
          placeholder="Full Description"
          value={fullDesc}
          onChange={(e) => setFullDesc(e.target.value)}
          rows={5}
          className={`w-full p-3 rounded-lg bg-zinc-800 text-white border ${errors.fullDesc ? "border-red-500" : "border-zinc-700"} focus:ring-2 focus:ring-indigo-500 resize-none`}
        />
        <button type="submit" className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-semibold text-lg transition shadow-md hover:shadow-lg">
          Add Idea
        </button>
      </form>
    </div>
  );
}
