const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("Prep'O AI Backend Running");
});

app.use("/api", require("./routes/test"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
