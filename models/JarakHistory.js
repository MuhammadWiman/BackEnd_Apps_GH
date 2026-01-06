const mongoose = require("mongoose");

const JarakHistorySchema = new mongoose.Schema({
  ip: String,
  distance_cm : Number,
  timestamp: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("JarakHistory", JarakHistorySchema);
