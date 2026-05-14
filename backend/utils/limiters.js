import { createRateLimiter } from "../middleware/rateLimiterMiddleware.js";

export const authLimiter = createRateLimiter(
    5,
    10 * 60 * 1000,
    "Too many login attempts"
);

export const createLimiter = createRateLimiter(
    20,
    60 * 1000,
    "Too many actions, slow down"
);

export const generalLimiter = createRateLimiter(
    100,
    15 * 60 * 1000,
    "Too many requests"
);