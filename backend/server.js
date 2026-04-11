const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ---- Middlewares ----
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- DB Connection ----
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ DB Error:", err));

// ---- Routes ----
const listingRoutes = require("./routes/listingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/listings", listingRoutes);
app.use("/api/listings/:id/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

// ---- Default Route ----
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Wanderlust API 🌍" });
});

// ---- 404 Handler ----
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ---- Error Handler ----
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).json({ message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
