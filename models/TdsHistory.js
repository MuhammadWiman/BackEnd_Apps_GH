const mongoose = require("mongoose");

const TdsHistorySchema = new mongoose.Schema({
  ip: String,
  tds_ppm: Number,
  timestamp: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("TdsHistory", TdsHistorySchema);
