import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { CreatePosts, DeletePosts, GetPostById, GetPosts, GetPostsByCat, UpdatePost } from "../controllers/PostsController.js";

const router = Router()


router.post('/', authMiddleware, CreatePosts )
router.get('/', authMiddleware, GetPosts)
router.get('/category/:category', authMiddleware, GetPostsByCat)
router.get('/:id', authMiddleware, GetPostById)
router.put('/:id', authMiddleware, UpdatePost)
router.delete('/:id', authMiddleware, DeletePosts)


export default router