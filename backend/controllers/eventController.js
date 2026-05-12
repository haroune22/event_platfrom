import db from "../config/db"
import { randomUUID } from "crypto";



export const CreateEvent = async (req, res) => {

    const user = req.user.id;
    const { title, content, media, communityId, category, eventDate } = req.body;

    if (!title || !content || !communityId || !category || !eventDate) {
        return res.status(400).json({
            message: "all fields required"
        });
    }

    try {

        const [community] = await db.query(
            `SELECT * FROM community WHERE id = ?`,
            [communityId]
        );

        if (community.length === 0) {
            return res.status(404).json({
                message: "community not found"
            });
        }

        const postId = randomUUID();

        await db.query(
            `INSERT INTO posts
            (id, title, content, media, type, userId, communityId, category)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [postId, title, content, media, 'event', user, communityId, category]
        );

        await db.query(
            `INSERT INTO events
            (userId, postId, eventDate)
            VALUES (?, ?, ?)`,
            [user, postId, eventDate]
        );

        return res.status(201).json({ message: "event created" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};


export const GetEvents = async (req, res) => {

    const { category, communityId, title } = req.query

    try {
        let query = 
        `SELECT p.*, u.username, u.profilePic, e.eventDate
        FROM posts p
        JOIN users u ON p.userId = u.id
        JOIN events e ON p.id = e.postId
        WHERE p.type = ?`

        const values = ['event']

        if(category){
            query += ` AND p.category = ?`
            values.push(category)
        };


        if(communityId){
            query += ` AND p.communityId = ?`
            values.push(communityId)
        };

        if(title){
            query += ` AND p.title LIKE ?`
            values.push(`%${title}%`)
        };
        
        query += " ORDER BY p.createdAt DESC";
        
        const [events] = await db.query(
            query,
            values
        )

        return res.status(200).json({ message: 'events found', events: events})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error"});
    }
}


export const GetEvent = async (req, res) => {

    const eventId = req.params.id;

    try {

        const [event] = await db.query(
            `SELECT e.*, p.*, u.username, u.profilePic
            FROM events e
            JOIN posts p ON e.postId = p.id
            JOIN users u ON p.userId = u.id
            WHERE e.id = ?
            `,
            [eventId]
        );

        if (event.length === 0) {
            return res.status(404).json({ message: "event not found" });
        }

        return res.status(200).json({ message: 'event retrieved', event: event[0]});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}


export const UpdateEvent = async (req, res) => {
    const user = req.user.id
    const eventId = req.params.id
    const { title, content, media, category, eventDate } = req.body;

    try {
        const [event] = await db.query(`
            SELECT e.*, p.*
            FROM events e
            JOIN posts p ON e.postId = p.id
            WHERE e.id = ?
            `,
            [eventId]
        );

        if (event.length === 0) {
            return res.status(404).json({ message: "event not found" });
        }

        if(event[0].userId !== user){
            return res.status(400).json({ message: 'not authorized '})
        }

        const updates = {
            title,
            content,
            media,
            category
        };

        if(eventDate){
             await db.query(
            `UPDATE events 
            SET eventDate = ?
            WHERE id = ?
            `
            [eventDate, eventId]
        )
        }

        const fields = [];
        const values = [];

        for(const key in updates){
            if(updates[key] !== undefined){
                fields.push(` ${key} = ?,`)
                values.push(updates[key])
            }
        }

        if (fields.length > 0) {
            values.push(event[0].postId);

            await db.query(
                `
                UPDATE posts
                SET ${fields.join(", ")}
                WHERE id = ?
                `,
                values
            );
        }

        return res.status(200).json({ message:'event updated'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error"});
    }
}


export const DeleteEvent = async (req, res) => {
    const user = req.user.id
    const eventId = req.params.id

    try {

        const [event] = await db.query(
            `SELECT e.*, p.*
            FROM event e
            JOIN posts p ON e.postId = p.id
            WHERE e.id = ?`,
            [eventId]
        );

        if (event.length === 0) {
            return res.status(404).json({ message: "event not found" });
        }

        if(event[0].userId !== user){
            return res.status(400).json({ message: 'not authorized '})
        }

        await db.query(
            `DELETE FROM posts WHERE id = ?`,
            [event[0].postId]
        )
        
        return res.status(200).json({ message: 'event deleted'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error"});
    }
}

