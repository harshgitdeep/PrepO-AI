const mongoose = require("mongoose");

const MockInterviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  question: String,
  correctAnswer: String,

  userAnswer: String,
  aiFeedback: String,
  score: Number,

  topic: String,
  difficulty: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MockInterview", MockInterviewSchema);
