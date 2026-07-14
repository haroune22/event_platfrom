import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { CreateCommunity, DeleteCommunity, GetCommunities, GetCommunitiesByCat, GetCommunityById, UpdateCommunity } from "../controllers/communityController.js";
import { createLimiter } from "../utils/limiters.js";

const router = Router()


router.post('/', authMiddleware, createLimiter, CreateCommunity )
router.get('/', authMiddleware, GetCommunities)
router.get('/category/:category', authMiddleware, GetCommunitiesByCat)
router.get('/:id', authMiddleware, GetCommunityById)
router.put('/:id', authMiddleware, UpdateCommunity)
router.delete('/:id', authMiddleware, DeleteCommunity)

// promote & demote:
router.post('/:id/promote', authMiddleware,   () => {})
router.post('/:id/demote', authMiddleware,   () => {})


export default router