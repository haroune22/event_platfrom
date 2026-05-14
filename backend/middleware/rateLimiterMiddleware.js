
import rateLimit from "express-rate-limit";

export const createRateLimiter = (max, windowMs, message) => {
    return rateLimit({
        windowMs,
        max,
        message: {
            message,
        },

        standardHeaders: true,
        legacyHeaders: false,
    });
};