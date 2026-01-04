import mongoose from "mongoose";

const FlowSessionSchema = new mongoose.Schema({
  userId: String,
  ideaId: String,
  startTime: Date,
  endTime: Date,
  finalState: String,
  duration: Number
});

export default mongoose.model("FlowSession", FlowSessionSchema);
