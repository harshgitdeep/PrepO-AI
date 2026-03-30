const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/google", async (req, res) => {
  try {
    const { name, email, googleId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        googleId,
      });

      await user.save();
    }

    res.json({
      message: "User logged in",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
