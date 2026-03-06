import { Router } from 'express';
import { getProfile } from '../controllers/profileController';

const router = Router();

// GET /api/profile
router.get('/', getProfile);

export default router;
