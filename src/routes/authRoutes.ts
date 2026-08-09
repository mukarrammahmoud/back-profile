import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, me } from "../controllers/authController";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { loginSchema } from "../schemas";
const router = Router();
const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { success: false, message: "Too many login attempts." },
});
router.post("/login", loginLimit, validate(loginSchema), login);
router.get("/me", requireAuth, me);
export default router;
