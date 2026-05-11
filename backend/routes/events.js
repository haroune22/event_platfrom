import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { AttendEvent, CreateEvent, DeleteEvent, GetEvent, GetEventAttendees, GetEvents, LeaveEvent, UpdateEvent } from "../controllers/eventController.js";


const router = Router()


router.post('/', authMiddleware,  CreateEvent)
router.get('/', authMiddleware, GetEvents)
router.get('/id', authMiddleware, GetEvent)
router.update('/:id', authMiddleware, UpdateEvent)
router.delete('/:id', authMiddleware, DeleteEvent)

//event_attendance
router.post('/:id/attend', authMiddleware, AttendEvent)
router.post('/:id/leave', authMiddleware, LeaveEvent)
router.get('/:id/event_attendees', authMiddleware, GetEventAttendees)



export default router