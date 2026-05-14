import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { CreateEvent, DeleteEvent, GetEvent, GetEvents, UpdateEvent } from "../controllers/eventController.js";
import { AttendEvent, GetEventAttendees, LeaveEvent } from "../controllers/eventAttendeesController.js";
import { createLimiter, generalLimiter } from "../utils/limiters.js";


const router = Router()


router.post('/', authMiddleware, createLimiter, CreateEvent)
router.get('/', authMiddleware, generalLimiter, GetEvents)
router.get('/id', authMiddleware, GetEvent)
router.put('/:id', authMiddleware, UpdateEvent)
router.delete('/:id', authMiddleware, DeleteEvent)

//event_attendance
router.post('/:id/attend', authMiddleware, AttendEvent)
router.post('/:id/leave', authMiddleware, LeaveEvent)
router.get('/:id/event_attendees', authMiddleware, GetEventAttendees)



export default router