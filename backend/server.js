const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();

// ===============================
// DATABASE
// ===============================

connectDB();

// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-six-hazel-n1fqu65lpu.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// ===============================
// REQUEST LOGGER
// ===============================

app.use((req, res, next) => {
  console.log("====================================");
  console.log("📡 Incoming Request");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Body:", req.body);
  console.log("====================================");

  next();
});

// ===============================
// ROUTES
// ===============================

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/projects", require("./routes/projectRoutes"));

app.use("/api/contact", require("./routes/contactRoutes"));

// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy ✅",
    emailConfigured: !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS,
  });
});

// ===============================
// ROOT ROUTE
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running 🚀",
  });
});

// ===============================
// 404 ROUTE
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ===============================
// ERROR HANDLER
// ===============================

app.use((error, req, res, next) => {
  console.error("❌ Server Error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("====================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`📧 Contact email system ready`);
  console.log("====================================");
});