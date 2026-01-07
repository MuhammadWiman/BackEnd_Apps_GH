const express = require("express");
const router = express.Router();
const TdsHistory = require("../models/TdsHistory");

router.get("/latest", async (req, res) => {
  try {
    const latestData = await TdsHistory.findOne()
      .sort({ createdAt: -1 });

    if (!latestData) {
      return res.status(404).json({ message: "No TDS data found" });
    }

    res.json(latestData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;