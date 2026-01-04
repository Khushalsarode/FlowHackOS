import express from "express";
import FlowSession from "../models/FlowSession.js";
import UserMomentum from "../models/UserMomentum.js";

const router = express.Router();

/* START FLOW */
router.post("/start", async (req, res) => {
  const session = await FlowSession.create({
    userId: req.body.userId,
    ideaId: req.body.ideaId,
    startTime: new Date()
  });
  res.json(session);
});

/* END FLOW */
router.post("/end", async (req, res) => {
  const session = await FlowSession.findById(req.body.sessionId);
  session.endTime = new Date();
  session.finalState = req.body.finalState;
  session.duration =
    (session.endTime - session.startTime) / 1000;

  await session.save();

  let momentum = await UserMomentum.findOne({ userId: session.userId });
  if (!momentum) momentum = await UserMomentum.create({ userId: session.userId });

  if (req.body.finalState === "IN_FLOW") {
    momentum.streak += 1;
    momentum.momentumScore += 10;
  } else {
    momentum.streak = 0;
  }

  momentum.lastSessionDate = new Date();
  await momentum.save();

  res.json({ success: true });
});

/* STATS */
router.get("/stats/:userId", async (req, res) => {
  const momentum = await UserMomentum.findOne({ userId: req.params.userId });
  res.json(momentum);
});

export default router;
