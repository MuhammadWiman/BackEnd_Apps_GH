require("dotenv").config(); // HARUS BARIS PERTAMA
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const dhtHistoryRoutes = require("./addHistory/dhtGET"); 
const jarakHistoryRoutes = require("./addHistory/jarakGET");
const tdsHistoryRoutes = require("./addHistory/tdsGET");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dht-history", dhtHistoryRoutes);
app.use("/api/jarak-history", jarakHistoryRoutes);
app.use("/api/tds-history", tdsHistoryRoutes);


app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "api-server",
    time: new Date()
  });
});
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});