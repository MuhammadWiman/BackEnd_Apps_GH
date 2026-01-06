const mongoose = require("mongoose");

const DhtHistorySchema = new mongoose.Schema({
  ip: String,
  temperature: Number,
  humidity: Number,
  timestamp: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("DhtHistory", DhtHistorySchema);
