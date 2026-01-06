require("dotenv").config(); // HARUS BARIS PERTAMA

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// DEBUG (boleh dihapus setelah stabil)
console.log("API MONGO_URL =", process.env.MONGO_URL);

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

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
