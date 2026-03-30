const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  question: String,
  answer: String,
  topic: String,
  difficulty: String,

  userAnswer: String,
  aiFeedback: String,
  score: Number,

  bookmarked: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
