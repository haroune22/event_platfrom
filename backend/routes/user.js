import { Router } from "express";
import { Login, Logout, Register } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authLimiter } from "../utils/limiters.js";

const router = Router()


router.post('/login', authLimiter, Login)
router.post('/register', authLimiter, Register)
router.post('/logout', authMiddleware, Logout)


export default router