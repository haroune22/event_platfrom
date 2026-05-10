import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { CreateEvent, DeleteEvent, GetEvent, GetEvents, UpdateEvent } from "../controllers/eventController.js";


const router = Router()


router.post('/', authMiddleware,  CreateEvent)
router.get('/', authMiddleware, GetEvents)
router.get('/id', authMiddleware, GetEvent)
router.update('/:id', authMiddleware, UpdateEvent)
router.delete('/:id', authMiddleware, DeleteEvent)



export default router