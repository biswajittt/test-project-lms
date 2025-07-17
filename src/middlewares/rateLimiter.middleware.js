import rateLimit from "express-rate-limit";

// Global limiter: 100 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message:
    "Too many requests from this IP, try again later! Only 100 requests every 15 minutes allowed per IP",
  standardHeaders: true,
  legacyHeaders: false,
});

export { apiLimiter };
