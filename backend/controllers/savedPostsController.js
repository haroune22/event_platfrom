import db from "../config/db.js";
import { updateUserInterest } from "../utils/userInterest.js";

export const SavePost = async (req, res) => {
    const user = req.user.id
    const postId = req.params.id

    try {

        const [post] = await db.query(
            `SELECT * FROM posts WHERE id = ?`,
            [postId]
            );

        if(post.length === 0){
            return res.status(404).json({ message: 'post not found'})
        };

        const [savedPost] = await db.query(
            `SELECT * FROM saved_posts WHERE userId = ? AND postId = ?`,
            [user, postId]
        );

        if(savedPost.length > 0){
            return res.status(400).json({ message: 'this post already saved'})
        };

        if(post[0].type !== 'education'){
            return res.status(404).json({ message: 'post not found'})
        };

        await db.query(
            `INSERT INTO saved_posts (userId, postId) VALUES (?, ?)`,
            [user, postId]
        )

        await updateUserInterest(user, post[0].category, 5)

        return res.status(200).json({ message: 'post saved successfully'})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}


export const UnSavePost = async (req, res) => {
    const user = req.user.id
    const postId = req.params.id

    try {

        const [post] = await db.query(
            `SELECT * FROM posts WHERE id = ?`,
            [postId]
            );

        if(post.length === 0){
            return res.status(404).json({ message: 'post not found'})
        };

        const [savedPost] = await db.query(
            `SELECT * FROM saved_posts WHERE userId = ? AND postId = ?`,
            [user, postId]
        );

        if(savedPost.length === 0){
            return res.status(400).json({ message: 'this post already is not saved'})
        };

        await db.query(
            `DELETE FROM saved_posts WHERE userId = ? AND postId = ?`,
            [user, postId]
        )
        
        await updateUserInterest(user, post[0].category, -5)

        return res.status(200).json({ message: 'post saved successfully'})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}


export const GetSavedPosts = async (req, res) => {
    const user = req.user.id

    try {

        const [savedPosts] = await db.query(
            `SELECT sp.*, p.*, u.username, u.profilePic
            FROM saved_posts sp 
            JOIN posts p ON sp.postId = p.id 
            JOIN users u ON p.userId = u.id
            WHERE sp.userId = ?
            ORDER BY sp.savedAt DESC`,
            [user]
        );

        if(savedPosts.length === 0){
            return res.status(400).json({ message: 'no posts saved'})
        };

        return res.status(200).json({ message: 'saved posts retrieved', savedPosts})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}