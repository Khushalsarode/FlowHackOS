import express from "express";
import Idea from "../models/Idea.js";

const router = express.Router();

/* CREATE IDEA */
router.post("/", async (req, res) => {
  try {
    const { title, shortDesc, fullDesc, user } = req.body;

    const idea = await Idea.create({
      title,
      shortDesc,
      fullDesc,
      createdBy: user.sub,
      team: [
        {
          name: user.name,
          avatar: user.picture,
          userId: user.sub,
          role: "owner",
        },
      ],
    });

    res.status(201).json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET IDEAS FOR LOGGED USER */
router.get("/:userId", async (req, res) => {
  try {
    const ideas = await Idea.find({ createdBy: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE IDEA */
router.put("/:id", async (req, res) => {
  try {
    const { userId, title, shortDesc, fullDesc, status } = req.body;
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    if (idea.createdBy !== userId)
      return res.status(403).json({ message: "Not authorized" });

    idea.title = title ?? idea.title;
    idea.shortDesc = shortDesc ?? idea.shortDesc;
    idea.fullDesc = fullDesc ?? idea.fullDesc;
    idea.status = status ?? idea.status;
    idea.updatedAt = Date.now();

    await idea.save();
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* DELETE IDEA */
router.delete("/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    if (idea.createdBy !== userId)
      return res.status(403).json({ message: "Not authorized" });

    await idea.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
