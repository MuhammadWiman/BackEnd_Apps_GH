const mongoose = require("mongoose");

const SIX_HOURS = 6 * 60 * 60 * 1000;

const DhtHistorySchema = new mongoose.Schema({
  ip: { type: String, required: true },
  temperature: Number,
  humidity: Number,

  rolling_key: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

DhtHistorySchema.pre("validate", function (next) {
  const ts = this.createdAt.getTime();
  this.rolling_key = Math.floor(ts / SIX_HOURS);
  next();
});

DhtHistorySchema.index(
  { ip: 1, rolling_key: 1 },
  { unique: true }
);

module.exports = mongoose.model("DhtHistory", DhtHistorySchema);
