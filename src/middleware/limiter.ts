import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 60,
});
