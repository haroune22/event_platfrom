import { Router } from "express";
import { Login } from "../controllers/userController.js";

const router = Router()


router.get('/login', Login)


export default router