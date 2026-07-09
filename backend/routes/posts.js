import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { CreatePosts, DeletePosts, getFeedPosts, GetPostById, GetPosts, GetPostsByCat, NotInterested, UpdatePost } from "../controllers/postsController.js";
import { CreateComment, DeleteComment, GetComments } from "../controllers/commentController.js";
import { GetSavedPosts, SavePost, UnSavePost } from "../controllers/savedPostsController.js";
import { createLimiter, generalLimiter } from "../utils/limiters.js";
import { DeleteEducation, UpdateEducation } from "../controllers/postsEducationController.js";


const router = Router()


router.post('/', authMiddleware, createLimiter , CreatePosts )
router.get('/', authMiddleware, generalLimiter, GetPosts)
router.get('/feed', authMiddleware, generalLimiter, getFeedPosts)
router.get('/saved', authMiddleware, GetSavedPosts)
router.get('/category/:category', authMiddleware, GetPostsByCat)
router.get('/:id', authMiddleware, GetPostById)
router.put('/:id', authMiddleware, UpdatePost)
router.delete('/:id', authMiddleware, DeletePosts)

// education
router.put('/education/:id', authMiddleware, UpdateEducation )
router.delete('/education/:id', authMiddleware, DeleteEducation )

// comments
router.post('/:postId/comment', authMiddleware, createLimiter, CreateComment)
router.delete('/:postId/comment/:commentId', authMiddleware, DeleteComment)
router.get('/:postId/comments', authMiddleware, GetComments)

//saved posts
router.post('/:id/save', authMiddleware, SavePost)
router.delete('/:id/save', authMiddleware, UnSavePost)

// not interested
router.post('/:id/notInterested', authMiddleware, NotInterested )


export default router