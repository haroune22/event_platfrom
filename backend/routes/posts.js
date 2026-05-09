import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { CreatePosts, DeletePosts, GetPostById, GetPosts, GetPostsByCat, UpdatePost } from "../controllers/PostsController.js";
import { CreateComment, DeleteComment, GetComments } from "../controllers/commentController.js";

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


export default router