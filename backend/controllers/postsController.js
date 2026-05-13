import db from "../config/db";
import { getUserInterest, notInterested, updateUserInterest } from "../utils/userIntrest";

export const CreatePosts = async (req, res) => {
    const user = req.user.id
    const { title, content, media, type, communityId, category } = req.body

    if(!title || !content || !type || !category){
        return res.status(400).json({ message: "all fields required"})
    }

    try {
        if(communityId ) { 
            const [community] = await db.query(
                `SELECT * FROM community WHERE id = ?`,
                [communityId]
            )
            if (community.length === 0) {
                return res.status(404).json({ message: "community not found" });
            }
        }

        await db.query(
        `INSERT INTO posts (title, content, media, type, userId, communityId, category)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, content, media, type, user, communityId, category]
        );

        await updateUserInterest(user, category, 5)
        
        return res.status(201).json({ message: 'post created successfully'})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'internal server  error'})
    }
};

export const GetPosts = async (req, res) => {
    const { category, title, communityId } = req.query;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min( Math.max(parseInt(req.query.limit) || 10, 1), 50 );

    const offset = (page -1) * limit

    try {
        let query = `
            SELECT p.*, u.name AS creatorName
            FROM posts p
            JOIN users u ON p.userId = u.id
            WHERE 1=1
        `;

        const values = [];

        if (communityId) {
            query += " AND p.communityId = ?";
            values.push(`${communityId}`);
        }
        
        if (category) {
            query += " AND p.category = ?";
            values.push(category);
        }

        if (title) {
            query += " AND p.title LIKE ?";
            values.push(`%${title}%`);
        }

        if(!title && !category && communityId){
            const categories = await getUserInterest(user);

            if (categories.length > 0) {
                query += ` AND p.category IN (${categories.map(() => '?').join(',')})`;
                values.push(...categories);
            }
        }

        query += " ORDER BY p.createdAt DESC";

        query += ` LIMIT ? OFFSET ?`;

        values.push(limit, offset);

        const [rows] = await db.query(query, values);

        return res.status(200).json({message:'posts found', posts: rows });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }

};

export const GetPostsByCat = async (req, res) => {
    const user = req.user.id
    const category = req.params.category;

    try {
        const [rows] = await db.query(`
            SELECT p.*, u.name AS creatorName
            FROM posts p
            JOIN users u ON p.userId = u.id
            WHERE p.category = ?
            ORDER BY p.createdAt DESC
        `, [category]
        );

        return res.status(200).json({ message:'communities found', posts: rows });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
};


export const GetPostById = async (req, res) => {
    const user = req.user.id
    const id = req.params.id 

    if(!id){
        return res.status(400).json({ message: "post id is required" })
    }
        try {

        const [post] = await db.query(
            `SELECT * FROM posts WHERE id = ?`,
            [id]
        )

        if (post.length === 0) {
            return res.status(400).json({ message: "no post found" });
        }

        return res.status(201).json({ message: "Community created successfully", post: post[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error"});
    }
}

export const UpdatePost = async (req, res) => {
    const user = req.user.id
    const id = req.params.id

    const { title, content, media, category } = req.body

    if(!title || !content || !media || !category){
        return res.status(400).json({ message: "all fields required"})
    }

    try {

        const [post] = await db.query(
            `SELECT * FROM posts WHERE id = ?`,
            [id]
        )
        
        if(post.length === 0){
            return res.status(404).json({ message: 'post not found'})
        }

        if(post[0].userId !== user){
            return res.status(400).json({ message: 'not authorized to update this post'})
        }

        await db.query(
            `UPDATE posts
            SET title = ?, content = ?, media = ?, category = ?
            WHERE id = ?
            `,
            [title, content, media, category, id]
        )

        const [updatedPost] = await db.query(
            `SELECT * FROM posts WHERE id = ?`,
            [id]
        )
        return res.status(200).json({ message: 'post updated successfully', post: updatedPost[0]})
    } catch (error) {
        console.log(error)
        return res.status().json({ message: 'internal server  error'})
    }

};

export const DeletePosts = async (req, res) => {
    const user = req.user.id
    const id = req.params.id

    try {

        const [post] = await db.query(
            `SELECT * FROM posts WHERE id = ?`,
            [id]
        )
        
        if(post.length === 0){
            return res.status(404).json({ message: 'post not found'})
        }

        if(post[0].userId !== user){
            return res.status(400).json({ message: 'not authorized to delete this post'})
        }

        await db.query(
            `DELETE FROM posts WHERE id = ?`,
            [id]
        )

        return res.status(200).json({ message: 'post deleted successfully' })
    } catch (error) {
        console.log(error)
        return res.status().json({ message: 'internal server  error'})
    }
}


export const NotInterested = async (req, res) => {
    const user = req.user.id
    const postId = req.params.id

    try {

        const [post] = await db.query(
            `SELECT * FROM posts WHERE id = ?`,
            [id]
        )
        
        if(post.length === 0){
            return res.status(404).json({ message: 'post not found'})
        }

        if(post[0].userId === user){
            return res.status(400).json({ message: 'the owner can not be interested in the post he created'})
        } 

        await notInterested(user, post[0].category)

        return res.status(200).json({ message: 'user interest updated'})
        
    } catch (error) {
        console.log(error)
        return res.status().json({ message: 'internal server  error'})
    }
}