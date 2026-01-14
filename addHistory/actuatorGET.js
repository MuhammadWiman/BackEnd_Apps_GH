const express = require("express");
const router = express.Router();
const ActuatorHistory = require("../models/ActuatorHistory");

router.get("/latest", async (req, res) => {
  try {
    const { reason, action, from, to, limit = 20 } = req.query;

    const filter = {};
    if (reason) filter.reason = reason;
    if (action) filter.action = action;

    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = new Date(from);
      if (to) filter.timestamp.$lte = new Date(to);
    }

    const data = await ActuatorHistory.find(filter)
      .sort({ timestamp: -1 })
      .limit(Number(limit))
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
