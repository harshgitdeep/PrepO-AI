const express = require("express");
const router = express.Router();
const Roadmap = require("../models/Roadmap");

const {
  callGemini,
  generateRoadmapPrompt,
} = require("../services/geminiService");

router.post("/generate", async (req, res) => {
  try {
    const { userId, role, experience } = req.body;

    const prompt = generateRoadmapPrompt(role, experience);
    const roadmapText = await callGemini(prompt);

    const roadmap = new Roadmap({
      userId,
      role,
      experience,
      roadmapText,
    });

    await roadmap.save();

    res.json(roadmap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  const roadmap = await Roadmap.findOne({
    userId: req.params.userId,
  });

  res.json(roadmap);
});

module.exports = router;
