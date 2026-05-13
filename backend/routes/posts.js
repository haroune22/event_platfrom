import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { CreatePosts, DeletePosts, GetPostById, GetPosts, GetPostsByCat, UpdatePost } from "../controllers/PostsController.js";
import { CreateComment, DeleteComment, GetComments } from "../controllers/commentController.js";
import { GetSavedPosts, SavePost, UnSavePost } from "../controllers/savedPostsController.js";


const router = Router()


router.post('/', authMiddleware, CreatePosts )
router.get('/', authMiddleware, GetPosts)
router.get('/category/:category', authMiddleware, GetPostsByCat)
router.get('/:id', authMiddleware, GetPostById)
router.put('/:id', authMiddleware, UpdatePost)
router.delete('/:id', authMiddleware, DeletePosts)

// comments
router.post('/:postId/comment', authMiddleware, CreateComment)
router.delete('/:postId/comment/:commentId', authMiddleware, DeleteComment)
router.get('/:postId/comments', authMiddleware, GetComments)

//saved posts
router.post('/:id/save', authMiddleware, SavePost)
router.delete('/:Id/save', authMiddleware, UnSavePost)
router.get('/saved', authMiddleware, GetSavedPosts)

// not interested
router.post('/:id/notInterested', authMiddleware, NotInterestedPost )


export default router