require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/auth");
const actuatorHistoryRoutes = require("./addHistory/actuatorGET");
const dhtHistoryRoutes = require("./addHistory/dhtGET");
const jarakHistoryRoutes = require("./addHistory/jarakGET");
const tdsHistoryRoutes = require("./addHistory/tdsGET");

const app = express();
const PORT = process.env.PORT || 3000;

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// DATABASE (CONNECT ONCE)
// ======================
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // ⛔ Railway akan restart service
  });

// ======================
// ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/dht-history", dhtHistoryRoutes);
app.use("/api/jarak-history", jarakHistoryRoutes);
app.use("/api/actuator-history", actuatorHistoryRoutes);
app.use("/api/tds-history", tdsHistoryRoutes);

// ======================
// HEALTH CHECK
// ======================
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "api-server",
    env: process.env.NODE_ENV || "production",
    time: new Date().toISOString()
  });
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
