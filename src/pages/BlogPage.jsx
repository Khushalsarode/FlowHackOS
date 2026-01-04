import { useState } from "react";
import { FaUser, FaCalendarAlt, FaTags } from "react-icons/fa";

export default function BlogPage() {
  const [blogs] = useState([
    {
      title: "Building Scalable Hackathon Platforms in 2026",
      excerpt: "Learn how to design and deploy hackathon platforms that scale globally with real-time collaboration and AI-driven suggestions.",
      author: "Alice Johnson",
      date: "Jan 1, 2026",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1581091215364-234d0fae0b70?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Top 10 AI Tools Every Hacker Should Know",
      excerpt: "A deep dive into the AI tools that can accelerate your hackathon projects, from code assistants to automated design generators.",
      author: "Bob Smith",
      date: "Jan 5, 2026",
      category: "AI",
      image: "https://images.unsplash.com/photo-1612832021275-7db1d45d6f0a?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Hackathon Team Dynamics: How to Collaborate Effectively",
      excerpt: "Teamwork is critical! Explore strategies to communicate, delegate, and achieve success with diverse hackathon teams.",
      author: "Clara Lee",
      date: "Jan 10, 2026",
      category: "Collaboration",
      image: "https://images.unsplash.com/photo-1612831455547-1ee69bba67e3?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Design Thinking in Hackathons: From Idea to Prototype",
      excerpt: "Apply design thinking methodologies to accelerate your hackathon workflow and create impactful prototypes in record time.",
      author: "David Kim",
      date: "Jan 15, 2026",
      category: "Design",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    }
  ]);

  const categories = ["All", "Tech", "AI", "Collaboration", "Design"];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 px-4">
      <div className="mx-auto max-w-6xl space-y-12">

        {/* Hero Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">HackFLOW Blog</h1>
          <p className="text-zinc-400 text-lg">Insights, tutorials, and stories from the HackFLOW community.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedCategory === cat
                  ? "bg-indigo-500 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
              <img src={blog.image} className="w-full h-48 object-cover" />
              <div className="p-5 space-y-3">
                <span className="text-indigo-400 text-xs uppercase font-semibold">{blog.category}</span>
                <h3 className="text-white font-bold text-lg">{blog.title}</h3>
                <p className="text-zinc-400 text-sm">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-zinc-400 mt-2">
                  <div className="flex items-center gap-1">
                    <FaUser /> {blog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt /> {blog.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination / Placeholder */}
        <div className="flex justify-center">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition">Load More</button>
        </div>

      </div>
    </main>
  );
}
