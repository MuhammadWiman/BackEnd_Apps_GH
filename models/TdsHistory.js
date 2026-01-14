const mongoose = require("mongoose");

const SIX_HOURS = 6 * 60 * 60 * 1000;

const TdsHistorySchema = new mongoose.Schema({
  ip: { type: String, required: true },
  tds_ppm: Number,

  rolling_key: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

TdsHistorySchema.pre("validate", function (next) {
  const ts = this.createdAt.getTime();
  this.rolling_key = Math.floor(ts / SIX_HOURS);
  next();
});

TdsHistorySchema.index(
  { ip: 1, rolling_key: 1 },
  { unique: true }
);

module.exports = mongoose.model("TdsHistory", TdsHistorySchema);
