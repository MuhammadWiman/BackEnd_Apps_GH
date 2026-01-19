const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  kelembaban_tanah: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  raw: { type: mongoose.Schema.Types.Mixed }
}, {
  collection: 'sensor_records'
});

module.exports = mongoose.model('SensorRecord', SensorSchema);