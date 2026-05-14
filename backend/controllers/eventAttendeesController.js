import db from "../config/db.js";
import { updateUserInterest } from "../utils/userInterest.js";

export const AttendEvent = async (req, res) => {
    const user = req.user.id
    const eventId = req.params.id

    try {

        const [event] = await db.query(
            `SELECT e.*, p.*
            FROM events e
            JOIN posts p ON e.postId = p.id
            WHERE e.id = ?`,
            [eventId]
        );

        if (event.length === 0) {
            return res.status(404).json({ message: "event not found" });
        }

        if(event[0].userId === user){
            return res.status(400).json({ message: 'the owner can not join or leave his event '})
        }

        const [count] = await db.query(
            `SELECT COUNT(*) AS total
            FROM event_attendees
            WHERE eventId = ?`,
            [eventId]
        );

        if (count[0].total >= event[0].maxParticipants) {
            return res.status(400).json({ message: "event is full" });
        }

        const [attending] = await db.query(
            `SELECT * FROM event_attendees
            WHERE eventId = ? AND userId = ?`,
            [eventId, user]
        )

        if(attending.length > 0){
            return res.status(400).json({ message: 'user already joined this event'})
        }

        await db.query(
            `INSERT INTO event_attendees (eventId, userId) VALUES (?, ?)`,
            [eventId, user]
        )

        await updateUserInterest(user, event[0].category, 5)
        
        return res.status(200).json({ message: 'event joined'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error"});
    }
}


export const LeaveEvent = async (req, res) => {
    const user = req.user.id
    const eventId = req.params.id

    try {

        const [event] = await db.query(
            `SELECT e.*, p.*
            FROM events e
            JOIN posts p ON e.postId = p.id
            WHERE e.id = ?`,
            [eventId]
        );

        if (event.length === 0) {
            return res.status(404).json({ message: "event not found" });
        }

        if(event[0].userId === user){
            return res.status(400).json({ message: 'the owner can not join or leave his event'})
        }

        await db.query(
            `DELETE FROM event_attendees WHERE eventId = ? AND userId = ?`,
            [eventId, user]
        )
        
        await updateUserInterest(user, event[0].category, -5)
        
        return res.status(200).json({ message: 'user left event'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error"});
    }
}

export const GetEventAttendees = async (req, res) => {
    const user = req.user.id
    const eventId = req.params.id

    try {

        const [event] = await db.query(
            `SELECT e.*, p.*
            FROM events e
            JOIN posts p ON e.postId = p.id
            WHERE e.id = ?`,
            [eventId]
        );

        if (event.length === 0) {
            return res.status(404).json({ message: "event not found" });
        }
        
        const [event_attendees] = await db.query(
            `SELECT eat.*, u.name, u.profilePic
            FROM event_attendees eat
            JOIN users u ON eat.userId = u.id
            WHERE eat.eventId = ?
            ORDER BY eat.joinedAt DESC`,
            [eventId]
        )
        
        if (event_attendees.length === 0) {
            return res.status(404).json({ message: "no user is attending this event" });
        }

        
        return res.status(200).json({ message: 'event_attendees retrieved', event_attendees})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error"});
    }
}

