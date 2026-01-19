const express = require("express");
const router = express.Router();
const SoilHistory = require("../models/SensorRecord");

router.get("/latest", async (req, res) => {
  try {
    const latestData = await SoilHistory.findOne()
      .sort({ createdAt: -1 });

    if (!latestData) {
      return res.status(404).json({ message: "No soil data found" });
    }

    res.json(latestData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const { reason, action, from, to } = req.query;

    const filter = {};
    if (reason) filter.reason = reason;
    if (action) filter.action = action;

    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = new Date(from);
      if (to) filter.timestamp.$lte = new Date(to);
    }

    const data = await SoilHistory.find(filter)
      .sort({ timestamp: 1 }) // optional: urut lama → baru
      .select("-__v -_id");

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;