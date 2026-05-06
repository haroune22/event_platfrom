import { Router } from "express";
import { Login, Logout, Register } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()


router.post('/login', Login)
router.post('/register', Register)
router.post('/logout', authMiddleware, Logout)


export default router