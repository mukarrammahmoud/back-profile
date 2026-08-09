import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { profileSchema } from "../schemas";
const router = Router();
router.get("/", getProfile);
router.put("/", requireAuth, validate(profileSchema), updateProfile);
export default router;
