require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { callGemini } = require("./services/geminiService");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("Prep'O AI Backend Running");
});

app.use("/api", require("./routes/test"));

app.get("/test-gemini", async (req, res) => {
  const response = await callGemini("Explain OOP in simple words");
  res.send(response);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
