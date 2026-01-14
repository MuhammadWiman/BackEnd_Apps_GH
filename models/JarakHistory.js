const mongoose = require("mongoose");

const SIX_HOURS = 6 * 60 * 60 * 1000;

const JarakHistorySchema = new mongoose.Schema({
  ip: { type: String, required: true },
  distance_cm: Number,

  rolling_key: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// rolling 6 jam
JarakHistorySchema.pre("validate", function (next) {
  const ts = this.createdAt.getTime();
  this.rolling_key = Math.floor(ts / SIX_HOURS);
  next();
});

// 1 data / IP / rolling 6 jam
JarakHistorySchema.index(
  { ip: 1, rolling_key: 1 },
  { unique: true }
);

module.exports = mongoose.model("JarakHistory", JarakHistorySchema);
