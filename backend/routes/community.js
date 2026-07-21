import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { CreateCommunity, DeleteCommunity, GetCommunities, GetCommunitiesByCat, GetCommunityById, GetCommunityEvents, GetCommunityPosts, GetUserCommunities, UpdateCommunity } from "../controllers/communityController.js";
import { createLimiter } from "../utils/limiters.js";

const router = Router()


router.post('/', authMiddleware, createLimiter, CreateCommunity )
router.get('/', authMiddleware, GetCommunities)
router.get('/me', authMiddleware, GetUserCommunities)
router.get('/category/:category', authMiddleware, GetCommunitiesByCat)
router.get('/:id/posts', authMiddleware, GetCommunityPosts)
router.get('/:id/events', authMiddleware, GetCommunityEvents)
router.get('/:id', authMiddleware, GetCommunityById)
router.put('/:id', authMiddleware, UpdateCommunity)
router.delete('/:id', authMiddleware, DeleteCommunity)

// promote & demote:
router.post('/:id/promote', authMiddleware,   () => {})
router.post('/:id/demote', authMiddleware,   () => {})


export default router