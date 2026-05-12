import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { CreateEvent, DeleteEvent, GetEvent, GetEvents, UpdateEvent } from "../controllers/eventController.js";
import { AttendEvent, GetEventAttendees, LeaveEvent } from "../controllers/eventAttendeesController.js";


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