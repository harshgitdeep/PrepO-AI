const mongoose = require("mongoose");

const RoadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  role: String,
  experience: String,

  roadmapText: String,

  weeks: [
    {
      week: Number,
      topics: [String],
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Roadmap", RoadmapSchema);
