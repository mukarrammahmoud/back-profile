import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settingsController";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { settingsSchema } from "../schemas";
const router = Router();
router.get("/", getSettings);
router.put("/", requireAuth, validate(settingsSchema), updateSettings);
export default router;
