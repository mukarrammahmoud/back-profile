import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';

const router = Router();

router.get('/', getProfile);    // GET  /api/profile
router.put('/', updateProfile); // PUT  /api/profile

export default router;

