require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const dhtHistoryRoutes = require("./addHistory/dhtGET"); 
const jarakHistoryRoutes = require("./addHistory/jarakGET");
const tdsHistoryRoutes = require("./addHistory/tdsGET");

const app = express();

app.use(cors());
app.use(express.json());

// ⚠️ Penting: connect DB DI DALAM REQUEST (Vercel-safe)
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/dht-history", dhtHistoryRoutes);
app.use("/api/jarak-history", jarakHistoryRoutes);
app.use("/api/tds-history", tdsHistoryRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "api-server" });
});

module.exports = app;
