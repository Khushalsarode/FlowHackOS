import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: String,
  userId: String,
  role: { type: String, enum: ["owner", "member"], default: "member" },
});

const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDesc: String,
  fullDesc: String,
  status: { type: String, enum: ["active", "paused", "completed"], default: "active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
  team: [memberSchema],
});

export default mongoose.model("Idea", ideaSchema);
