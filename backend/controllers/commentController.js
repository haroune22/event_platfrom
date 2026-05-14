import db from "../config/db.js"
import { updateUserInterest } from "../utils/userInterest.js";

export const CreateComment = async (req, res) => {
    const user = req.user.id;
    const postId = req.params.postId;
    const { text } = req.body;
    
    if(!text){
        return res.status(400).json({ message: 'text required'})
    };

    try {
        const [post] = await db.query(
            `SELECT * FROM posts WHERE id = ?`,
            [postId]
        );

        if(post.length === 0){
            return res.status(404).json({ message: 'post not found'})
        };

        const [comment] = await db.query(
            `INSERT INTO comments (text, postId, userId) VALUES (?, ?, ?)`,
            [text, postId, user]
        );
        console.log(req.cookies)
        await updateUserInterest(user, post[0].category, 3)

        return res.status(200).json({ message: 'comment created successfully ', comment: comment[0]});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'internal server  error'})
    }
}

export const DeleteComment = async (req, res) => {
    const user = req.user.id
    const commentId = req.params.commentId
    
    try {

        const [comment] = await db.query(
            `SELECT * FROM comments WHERE id = ?`,
            [commentId]
        )

        if(comment.length === 0) {
            return res.status(404).json({ message: 'comment not found'})
        }

        if(comment[0].userId !== user){
            return res.status(400).json({ message: 'not authorized '})
        }

        await db.query(
            `DELETE FROM comments WHERE id = ?`,
            [commentId]
        )


        return res.status(200).json({ message: 'comment deleted successfully '});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'internal server  error'})
    }
}

export const GetComments = async (req,res) => {
    const postId = req.params.postId

    try {

        const [post] = await db.query(
            `SELECT * FROM posts WHERE id = ?`,
            [postId]
        );

        if(post.length === 0){
            return res.status(404).json({ message: 'post not found'})
        }; 

        const [comments] = await db.query(
            `SELECT c.*, u.name, u.profilePic 
            FROM comments c
            JOIN users u ON c.userId = u.id
            WHERE postId = ?
            ORDER BY c.createdAt DESC`,
            [postId]
        )
        
        return res.status(200).json({ message: 'comments retrieved ', comments});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'internal server  error'})
    }
}