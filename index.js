const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// ===== BASIC MIDDLEWARE =====
app.use(express.json());
app.use(cors());

// ===== RATE LIMIT =====
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute per IP
  message: {
    status: false,
    message: "Too many requests, please try again later."
  }
});
app.use(limiter);

// ===== API KEY MIDDLEWARE =====
const API_KEY = "rakib69";

function apiKeyAuth(req, res, next) {
  const userKey = req.headers["x-api-key"];

  if (!userKey) {
    return res.status(401).json({
      status: false,
      message: "API key missing"
    });
  }

  if (userKey !== API_KEY) {
    return res.status(403).json({
      status: false,
      message: "Invalid API key"
    });
  }

  next();
}

// ===== ROUTES =====
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "SoundCloud Music API running",
    owner: "Rakib Hasan"
  });
});

// Protected API route
app.use("/api", apiKeyAuth, require("./api/scsong"));

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: false,
    message: "Internal Server Error"
  });
});

// ===== SERVER START =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
