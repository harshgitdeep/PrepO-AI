const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

const {
  callGemini,
  generateQuestionsPrompt,
} = require("../services/geminiService");

router.post("/generate", async (req, res) => {
  try {
    const { userId, role, experience } = req.body;

    const prompt = generateQuestionsPrompt(role, experience);
    const aiResponse = await callGemini(prompt);

    const questions = JSON.parse(aiResponse);

    const savedQuestions = await Question.insertMany(
      questions.map((q) => ({
        ...q,
        userId,
      })),
    );

    res.json(savedQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  const questions = await Question.find({
    userId: req.params.userId,
  });

  res.json(questions);
});

module.exports = router;
